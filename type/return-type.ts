/**
 * APIにリクエストして成功、失敗した時の型定義
 * isSuccess: trueの場合は成功/falseの場合は失敗
 */
export type ReturnType = {isSuccess: boolean, message: string}