type SetType<T extends Set<unknown>> = T extends Set<infer U> ? U : never
