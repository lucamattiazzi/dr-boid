import { Boid } from "./types"

const distances = new Map()

export function computeDistance(boid1: Boid, boid2: Boid): number {
  const key = [boid1.id, boid2.id].sort().join("-")
  if (distances.has(key)) return distances.get(key)
  const sum = boid1.coords.reduce((acc, coord, i) => {
    const diff = coord - boid2.coords[i]
    return acc + diff * diff
  }, 0)
  const distance = Math.sqrt(sum)
  distances.set(key, distance)
  return distance
}

export function resetCache() {
  distances.clear()
}