KESTRA Integration Plan — BookStore
=================================

Goal
----
Provide a focused plan to import low-coupling, high-value assets from the Kestra project into the BookStore repository.

Scope candidates (recommended order)
-----------------------------------

1) Docker artifacts (low effort)
   - Files: `Dockerfile` (root snippets), `docker/usr/local/bin/docker-entrypoint.sh`, `Makefile` snippets
   - Why: Shell entrypoint patterns, build args and packaging examples, CI/packaging best-practices.
   - How to import: copy scripts/snippets and adapt to BookStore paths and service names.

2) Frontend monaco/yaml helpers (medium effort)
   - Files: `ui/src/composables/monaco/languages/yamlLanguageConfigurator.ts`, `ui/src/override/utils/yamlSchemas.ts`, `ui-libs/flow-yaml-utils` usages
   - Why: Monaco JSON/YAML schema wiring and auto-completion utilities that improve developer DX for editing YAML flows or config.
   - Considerations: Kestra UI uses Vue + Vite; BookStore uses Angular. The monaco parts and YAML schema definitions are framework-agnostic and can be adapted into Angular services.

3) YAML parser / utilities (medium effort)
   - Files: `core/src/main/java/io/kestra/core/serializers/YamlParser.java`, `core` YAML utils, `FlowInterface.SourceGenerator` helpers
   - Why: Robust YAML parsing, normalization and backwards compatibility utilities.
   - Considerations: Java code depends on Kestra's `JacksonMapper` helpers and models — we'll extract and adapt only the parsing logic and tests; add any missing Jackson config in BookStore.

4) Docker runner utilities (high effort)
   - Files: `script/src/main/java/io/kestra/plugin/scripts/runner/docker/Docker.java`, `DockerService.java`, `DockerOptions.java`
   - Why: Useful if BookStore will run or manage Docker tasks programmatically.
   - Considerations: These classes are tightly coupled to Kestra domain types (`RunContext`, `ScriptService` etc.) and the Docker Java client; porting will require refactoring and possibly a dedicated module.

5) Docs & examples (very low effort)
   - Files: `ui/src/assets/docs/*`, README examples, YAML blueprints
   - Why: Useful dashboard and flow examples that can be adapted as docs or seed examples.

Risks & Licensing
------------------
- Kestra is Apache‑2.0 licensed — permissive, but retain attributions where appropriate.
- Many Kestra Java classes are tightly coupled (Micronaut, custom mappers, internal models). Avoid large copy-pastes; prefer extracting small utilities and writing adapters.

Proposed work plan (concrete steps)
----------------------------------

1. Confirm which areas you want first (Docker artifacts, monaco/YAML helpers, YAML parser, runner utilities, docs). If you say "all", we'll prioritize Docker + docs + monaco helpers.

2. Clone Kestra repo locally for analysis:

   git clone https://github.com/kestra-io/kestra.git /tmp/kestra

3. For each chosen candidate file: list direct imports and dependencies (Maven/Gradle artifacts and internal package references). Produce a short extraction plan for each file showing what must be copied vs adapted.

4. Implement extraction in BookStore as small, focused commits:
   - Add any required dependencies to `backend/pom.xml` or `frontend/package.json`.
   - Adjust package names, remove internal Kestra references, implement small adapters where necessary.
   - Add unit tests or simple smoke runs to verify behavior.

5. Document changes and add attribution in `DOCS` or a `THIRD_PARTY.md` file.

Estimated effort (very rough)
----------------------------
- Docker artifacts & docs: 1–2 hours
- Monaco YAML helpers (port to Angular): 4–8 hours
- YamlParser utilities (Java adaptation): 4–8 hours
- Docker runner utilities (deep port): 2–4 days

Deliverables for the first pass
------------------------------
- A list of 5–10 concrete files to import with a dependency map.
- Small patches for one low-effort area (e.g., Docker entrypoint + README) applied to BookStore.
- A follow-up PR proposal for the medium-effort area you pick.

Next action (pick one)
----------------------
- A) I analyze and produce the dependency map for the top 3 candidate files.
- B) I extract the monaco YAML helpers and scaffold them in the frontend (Angular service + NPM deps).
- C) I extract the YamlParser helpers and adapt them to BookStore backend (Java/Jackson changes).

Select A, B or C and I will proceed with the chosen step.
