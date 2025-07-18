# 🌊 Contributing to pond.repo

Welcome, fellow ripple-maker. This project is more than code—it's a living system of shimmer, syntax, and shared imagination. Whether you're submitting a pull request, proposing a new glossary term, or refining a Protobuf schema, your contribution adds depth to the pond.

---

## 🧼 Protobuf Style & Linting

We use [Buf](https://buf.build/) to harmonize our `.proto` files. Think of it as a **Depth Song**—a rhythm that keeps our schemas clean, readable, and interoperable.

### ✅ Active Rule Sets

| Rule Set               | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| `STANDARD`             | Core Protobuf formatting and structure                                     |
| `FILE_LOWER_SNAKE_CASE`| Ensures filenames follow `lower_snake_case.proto` convention               |

### ❌ Allowed Exceptions

| Rule                      | Reason for Exception                                                      |
|---------------------------|---------------------------------------------------------------------------|
| `ENUM_PASCAL_CASE`        | Enum values may shimmer with alternate casing when context calls for it  |
| `RPC_ALLOW_SAME_REQUEST_RESPONSE` | RPCs may echo the same shape for request and response—like a ripple returning |

### 🧩 Naming Conventions

All service names must end with `API`.  
This suffix is our **Glowroot**—a signal of clarity and purpose.

✅ `UserAPI`  
❌ `UserService`

---

### 🗂️ Module-Specific Overrides

| Module Path     | Rule Set   | Exceptions         |
|-----------------|------------|--------------------|
| `proto/`        | `STANDARD` | `ENUM_PASCAL_CASE` |
| `vendor/`       | `MINIMAL`  | _(minimal linting)_|

---

### 🚫 Ignored Paths

These zones are **Quiet Waters**—excluded from linting:

- `proto/third_party/**`
- `proto/legacy/**`

---

### 🎯 Rule-Specific Ignores

| Rule               | Ignored Path(s)           |
|--------------------|---------------------------|
| `ENUM_PASCAL_CASE` | `proto/experimental/**`   |

---

### 💬 Comment-Based Ignores

For rare cases, you may use inline comments to silence a lint ripple:

```proto
// buf:lint:ignore ENUM_PASCAL_CASE
enum MyEnum {
  VALUE_ONE = 0;
}
