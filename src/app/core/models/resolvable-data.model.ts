export interface SuccessfulResolve<T> {
  data?: T;
}

export interface FailedResolve<E> {
  error?: E;
}

export type ResolvableData<T, E> = SuccessfulResolve<T> & FailedResolve<E>;
