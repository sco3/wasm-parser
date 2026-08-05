use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn parse_f64_rust(input: &str) -> f64 {
    input.parse::<f64>().unwrap_or(f64::NAN)
}

#[wasm_bindgen]
pub fn parse_f64_rust_checked(input: &str) -> f64 {
    match input.parse::<f64>() {
        Ok(v) => v,
        Err(_) => f64::NAN,
    }
}

#[wasm_bindgen]
pub fn parse_many_rust(inputs: Vec<String>) -> Vec<f64> {
    inputs.iter()
        .map(|s| s.parse::<f64>().unwrap_or(f64::NAN))
        .collect()
}