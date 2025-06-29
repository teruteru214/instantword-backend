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
		for (const [kid, certificate] of Object.entries(publicKeys)) {
			try {
				console.log("Attempting JWT verification with kid:", kid);

				// X.509証明書を公開鍵としてインポート
				const publicKey = await importX509(certificate, "RS256");

				// JWT検証（署名検証のみ）
				const { payload } = await jwtVerify(token, publicKey);

				console.log("JWT verification successful with kid:", kid);

				// 有効期限チェック
				const currentTime = Math.floor(Date.now() / 1000);
				if (payload.exp && payload.exp < currentTime) {
					console.error("JWT expired");
					return false;
				}

				return true;
			} catch (verifyError) {
				const errorMessage =
					verifyError instanceof Error
						? verifyError.message
						: String(verifyError);
				console.log(`JWT verification failed with kid ${kid}:`, errorMessage);
			}
		}

		// すべてのキーで検証に失敗
		console.error("JWT signature verification failed with all available keys");
		return false;
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		console.error("JWT verification failed:", errorMessage);
		return false;
	}
}
