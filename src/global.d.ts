interface Skeleton {
  image: string
  position: SkeletonPosition
  velocity: SkeletonVelocity
}

interface SkeletonPosition {
  x: number
  y: number
}

interface SkeletonVelocity {
  x: number
  y: number
}
