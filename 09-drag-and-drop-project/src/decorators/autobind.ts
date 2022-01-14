namespace App {
  export function AutoBind(_target: any, _name: string, descriptor: PropertyDescriptor) {
    const adjacentDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get() {
        return descriptor.value.bind(this)
      },
    }
    return adjacentDescriptor
  }
}
