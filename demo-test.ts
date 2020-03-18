import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test('5 + 8 = 13', () => {
  assertEquals(5 + 8, 13)
})

Deno.test('5 * 8 = 40', () => {
  assertEquals(5 * 8, 40)
})

Deno.test('5 ** 8 = 390625', () => {
  assertEquals(5 ** 8, 390625)
})
