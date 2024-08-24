import {
  Boundary,
} from './Boundary.js'

export type BoundariesEntityType = Entity<Boundaries>
export type BoundariesPrimitiveType = Primitives<Boundaries>

export class Boundaries {
  readonly north: Boundary
  readonly northeast: Boundary
  readonly east: Boundary
  readonly southeast: Boundary
  readonly south: Boundary
  readonly southwest: Boundary
  readonly west: Boundary
  readonly northwest: Boundary

  constructor(
    north: Boundary,
    northeast: Boundary,
    east: Boundary,
    southeast: Boundary,
    south: Boundary,
    southwest: Boundary,
    west: Boundary,
    northwest: Boundary,
  ) {
    this.north = north
    this.northeast = northeast
    this.east = east
    this.southeast = southeast
    this.south = south
    this.southwest = southwest
    this.west = west
    this.northwest = northwest
  }
}
