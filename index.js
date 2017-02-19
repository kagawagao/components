export default function () {
  process.env.NODE_ENV === 'production' || console.log('please use `import xyz from \'platojs/components/xyz\'` directly')
}
