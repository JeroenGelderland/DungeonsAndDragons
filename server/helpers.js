export function proxyFactory (obj, fn, fallback) {
    return new Proxy(obj, {
        get (target, str, proxy) {
            if (str in target) return fn(target[str])
            return fallback
        }
    })
}