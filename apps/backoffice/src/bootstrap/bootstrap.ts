export interface IBootstrap<T> {
    initialize(): Promise<T>;
}