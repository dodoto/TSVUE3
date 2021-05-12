export default interface DirectiveInterface {
  name: string;
  config: object;
  [Symbol.iterator]: () => object;
  [key: string]: string | object;
}