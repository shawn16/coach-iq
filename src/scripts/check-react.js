const fs = require("fs")
const path = require("path")

function findPackages(packageName, dir = "node_modules", results = []) {
  const packagePath = path.join(dir, packageName)
  if (fs.existsSync(packagePath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(packagePath, "package.json")))
      results.push({
        path: packagePath,
        version: packageJson.version,
      })
    } catch (e) {
      console.error(`Error reading package.json in ${packagePath}`)
    }
  }

  // Check nested node_modules
  const entries = fs.existsSync(dir) ? fs.readdirSync(dir) : []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry)
    if (entry !== packageName && fs.statSync(fullPath).isDirectory()) {
      const nestedNodeModules = path.join(fullPath, "node_modules")
      if (fs.existsSync(nestedNodeModules)) {
        findPackages(packageName, nestedNodeModules, results)
      }
    }
  }

  return results
}

console.log("React instances:")
console.table(findPackages("react"))

console.log("React DOM instances:")
console.table(findPackages("react-dom"))

