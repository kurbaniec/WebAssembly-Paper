mod utils;

use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::JsFuture;
use comrak::{markdown_to_html, ComrakOptions};


// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn make_html(text: String) -> String {
    let mut options = ComrakOptions::default();
    options.unsafe_ = true;
    markdown_to_html(&text, &options)
}


