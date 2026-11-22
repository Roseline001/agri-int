import { test, expect } from "vitest";
import { getWeather, getMonthRain } from "../api/weather";

test("gets current temperature", async () => {
    globalThis.fetch = async () => ({
        ok: true,
        json: async () => ({
            current: {
                temperature_2m: 22
            }
        })
    })
    const result = await getWeather(1, 36)
    expect(result.current.temperature_2m).toBe(22)
})
test("rejects when temperature requests fails", async () => {
    globalThis.fetch = async () => ({
        ok: false,
    })
    await
    expect(getWeather(1, 36)).rejects.toThrow("Weather request failed")
})

test("gets monthly rainfall data", async () => {
    const data = {
        monthly: {
            precipitation: [10,20,30,40,50,60]
        }
    }
    globalThis.fetch = async () => ({
        ok: true,
        json: async () => data
    })
    const result = await getMonthRain(1, 36, 2025, 6);
    expect(result).toEqual(data);
})