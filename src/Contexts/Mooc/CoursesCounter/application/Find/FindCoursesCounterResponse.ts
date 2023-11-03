// import avro from 'avsc'

// const schema: avro.Schema = {
//   name: 'FindCoursesCounterResponse',
//   type: 'record',
//   // namespace: 'mooc.coursesCounter.application',
//   doc: 'Find courses counter response',
//   fields: [
//     {
//       name: 'total',
//       type: 'int',
//     },
//   ],
// }
// const avroType = avro.Type.forSchema(schema)

export class FindCoursesCounterResponse {
  readonly total: number

  constructor(total: number) {
    this.total = total
  }

  toJSON() {
    const response = {
      total: this.total,
    }

    // const avroType = avro.Type.forValue(response)
    // const avroBuffer = avroType.toBuffer(response)
    // return avroBuffer

    return response
  }
}
