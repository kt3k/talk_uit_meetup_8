async function main() {
  const res = await fetch("https://example.org/")
  const text = await res.text()
  console.log(text.substr(0, 200), '...')
}

main()
