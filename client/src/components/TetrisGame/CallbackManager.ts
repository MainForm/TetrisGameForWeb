class CallbackManager<T extends (...args: any[]) => void>{
  private callbacks: T[] = [];

  // 콜백 등록
  register(cb: T): void {
    this.callbacks.push(cb);
  }

  // 콜백 제거
  unregister(cb: T): void {
    this.callbacks = this.callbacks.filter(fn => fn !== cb);
  }

  // 콜백 실행
  run(... args: Parameters<T> ): void {
    this.callbacks.forEach(cb => cb(...args));
  }

  // 전체 초기화 (선택)
  clear(): void {
    this.callbacks = [];
  }
}

export default CallbackManager;