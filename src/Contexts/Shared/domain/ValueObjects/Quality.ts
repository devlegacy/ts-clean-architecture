export class Quality {
  // ❌
  // sum(quality: Quality): Quality {

  // ✅ semantic
  increase(): Quality {
    // ....
    return new Quality()
  }
}
