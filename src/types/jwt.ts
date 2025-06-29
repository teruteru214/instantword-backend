// Google公開鍵の型定義（PEM形式の証明書）
export interface GooglePublicKeys {
	[key: string]: string; // kid: PEM証明書
}

// JWTヘッダーの型定義
export interface JWTHeader {
	alg: string;
	typ: string;
	kid?: string;
}
