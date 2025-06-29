import { importX509, jwtVerify } from "jose";
import type { GooglePublicKeys } from "../types/jwt";

// Firebase JWTのペイロード型定義
export interface FirebaseJWTPayload {
	iss: string; // 発行元
	aud: string; // 対象（Firebase プロジェクトID）
	auth_time: number; // 認証時間
	user_id: string; // Firebase UID
	sub: string; // 件名（Firebase UID）
	iat: number; // 発行時
	exp: number; // 有効期限
	email?: string; // メールアドレス
	email_verified?: boolean; // メール認証済みかどうか
	picture?: string; // プロフィール画像URL
	name?: string; // ユーザー名
	sign_in_provider?: string; // 認証プロバイダー（google.com, password等）
}

// エラー結果の型定義
export interface JWTErrorResult {
	success: false;
	error: string;
	code: number;
}

// 成功結果の型定義
export interface JWTSuccessResult {
	success: true;
	uid: string;
	img: string | null;
	email: string | null;
	provider: string | null;
}

// 結果の型定義
export type JWTResult = JWTErrorResult | JWTSuccessResult;

// 型ガード：Firebase JWTペイロードかどうかをチェック
function isFirebaseJWTPayload(obj: unknown): obj is FirebaseJWTPayload {
	return (
		typeof obj === "object" &&
		obj !== null &&
		"iss" in obj &&
		"aud" in obj &&
		"auth_time" in obj &&
		"user_id" in obj &&
		"sub" in obj &&
		"iat" in obj &&
		"exp" in obj &&
		typeof (obj as FirebaseJWTPayload).iss === "string" &&
		typeof (obj as FirebaseJWTPayload).aud === "string" &&
		typeof (obj as FirebaseJWTPayload).auth_time === "number" &&
		typeof (obj as FirebaseJWTPayload).user_id === "string" &&
		typeof (obj as FirebaseJWTPayload).sub === "string" &&
		typeof (obj as FirebaseJWTPayload).iat === "number" &&
		typeof (obj as FirebaseJWTPayload).exp === "number"
	);
}

// Google公開鍵を取得
async function getGooglePublicKeys(): Promise<GooglePublicKeys> {
	const response = await fetch(
		"https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com",
	);
	if (!response.ok) {
		throw new Error("Failed to fetch Google public keys");
	}
	return await response.json();
}

// Firebase JWTを検証・デコードしてuid、img、email、providerを取得
export async function verifyAndExtractFirebaseJwt(
	token: string,
): Promise<JWTResult> {
	try {
		console.log("Starting JWT verification for token length:", token.length);

		// 1. Google公開鍵を取得
		const publicKeys = await getGooglePublicKeys();
		console.log("Retrieved public keys count:", Object.keys(publicKeys).length);

		// 2. 各公開鍵でJWT検証を試行
		for (const [kid, certificate] of Object.entries(publicKeys)) {
			try {
				console.log("Attempting JWT verification with kid:", kid);
				console.log("Certificate length:", certificate.length);

				// X.509証明書を公開鍵としてインポート
				const publicKey = await importX509(certificate, "RS256");
				console.log("Public key imported successfully");

				// JWT検証（署名検証のみ）
				const { payload } = await jwtVerify(token, publicKey);

				console.log("JWT verification successful with kid:", kid);
				console.log("Payload keys:", Object.keys(payload));

				// 型ガードでペイロードを安全に検証
				if (!isFirebaseJWTPayload(payload)) {
					console.log("Invalid Firebase JWT payload structure");
					return {
						success: false,
						error: "Invalid Firebase JWT payload structure",
						code: 400,
					};
				}

				// 有効期限チェック
				const currentTime = Math.floor(Date.now() / 1000);
				console.log("JWT expiration check:", {
					exp: payload.exp,
					currentTime: currentTime,
					expired: payload.exp < currentTime,
					timeRemaining: payload.exp - currentTime,
				});

				if (payload.exp < currentTime) {
					return {
						success: false,
						error: "Firebase JWT expired",
						code: 401,
					};
				}

				return {
					success: true,
					uid: payload.user_id,
					img: payload.picture || null,
					email: payload.email || null,
					provider: payload.sign_in_provider || null,
				};
			} catch (verifyError) {
				const errorMessage =
					verifyError instanceof Error
						? verifyError.message
						: String(verifyError);
				console.log(`JWT verification failed with kid ${kid}:`, errorMessage);
				console.log("Error type:", typeof verifyError);
				console.log(
					"Error constructor:",
					verifyError instanceof Error
						? verifyError.constructor.name
						: "Unknown",
				);
			}
		}

		// すべてのキーで検証に失敗
		console.log("All JWT verification attempts failed");
		return {
			success: false,
			error: "JWT signature verification failed with all available keys",
			code: 402,
		};
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		console.error("Firebase JWT verification failed:", errorMessage);
		return {
			success: false,
			error: `Firebase JWT verification failed: ${errorMessage}`,
			code: 500,
		};
	}
}
