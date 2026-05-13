// Minimal ambient declarations so `tsc --noEmit` passes before `npm install`.
declare module 'zustand' {
  type SetState<T> = (partial: Partial<T> | ((state: T) => Partial<T> | T)) => void
  type GetState<T> = () => T
  type StoreCreator<T> = (set: SetState<T>, get: GetState<T>) => T
  type UseBoundStore<T> = {
    (): T
    <U>(selector: (state: T) => U): U
  }
  export function create<T>(): (creator: StoreCreator<T>) => UseBoundStore<T>
  export function create<T>(creator: StoreCreator<T>): UseBoundStore<T>
}
