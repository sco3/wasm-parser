use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn parse_f64_rust(input: &str, count: i32) -> f64 {
    let mut result:f64 = 0.0;
    for _ in 0..count {
        result = input.parse::<f64>().unwrap_or(f64::NAN);
    }
    result
}

