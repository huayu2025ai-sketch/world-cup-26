declare module "qrcode" {
  export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H" | "low" | "medium" | "quartile" | "high";

  export type QRCodeCreateOptions = {
    errorCorrectionLevel?: ErrorCorrectionLevel;
    margin?: number;
  };

  export type QRCodeSymbol = {
    modules: {
      size: number;
      get: (row: number, col: number) => boolean;
    };
  };

  const QRCode: {
    create: (text: string, options?: QRCodeCreateOptions) => QRCodeSymbol;
  };

  export default QRCode;
}
