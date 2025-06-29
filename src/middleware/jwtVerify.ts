import { importX509, jwtVerify } from "jose";
import type { GooglePublicKeys } from "../types/jwt";

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

export async function verifyJwtToken(token: string): Promise<boolean> {
	try {
		// 1. Google公開鍵を取得
		const publicKeys = await getGooglePublicKeys();

		// 2. 各公開鍵でJWT検証を試行
		for (const [, certificate] of Object.entries(publicKeys)) {
			try {
				// X.509証明書を公開鍵としてインポート
				const publicKey = await importX509(certificate, "RS256");

				// JWT検証（署名検証のみ）
				const { payload } = await jwtVerify(token, publicKey);

				// 有効期限チェック
				const currentTime = Math.floor(Date.now() / 1000);
				if (payload.exp && payload.exp < currentTime) {
					return false;
				}

				// 発行時刻の検証（過去すぎる場合は無効）
				if (payload.iat && payload.iat > currentTime + 300) {
					console.error("JWT issued in the future");
					return false;
				}

				return true;
			} catch {
				// セキュリティのため、詳細なエラー情報は出力しない
				return false;
			}
		}

		return false;
	} catch {
		// セキュリティのため、詳細なエラー情報は出力しない
		return false;
	}
}
