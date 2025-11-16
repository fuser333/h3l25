# Factor Agents Academy - Módulo 3: GPTs Avanzados - H3L

**Fecha de completación:** 16 de noviembre de 2025

---

## Ejercicio 1: Deep Research

**Tema**: Arquitectura de Sistemas Multi-Agente para Auditorías de IA en MIPYMES Ecuatorianas

**Investigación completada**:
La investigación profunda del mercado (documento "Investigacion_Profunda_Mercado.md") ya contiene análisis exhaustivo de:
- Marco competitivo (ERPs básicos, consultores manuales, inercia)
- 7 casos de uso priorizados con ROI cuantificado (Order-to-Cash $18k, OEE $125k, LOPDP $20k, etc.)
- Arquitectura técnica completa (CrewAI + LlamaIndex + Router Multi-IA + RAG Seguro)
- Stack tecnológico: CrewAI para orquestación, LlamaIndex para RAG, Claude 3.5 Haiku/Sonnet, RPA para integración legacy, Presidio para anonimización PII
- Unit economics validados (margen Pro 54.9%, Enterprise setup 62.3%, retainer 57.9%)
- Costos OPEX: $62-75/cliente/mes (cloud $30, APIs $32.25, logging $0)

**Fuentes clave**:
- Benchmarks industriales: Tasa error ingreso manual 1-4%, OEE MIPYMES 60-66%, costo inventario 25%/año
- Marco legal: LOPDP Ecuador (Art. 9, 12, 16, 21, 41, 50), actividad SUPERDATOS
- Tecnología: Análisis frameworks multi-agente 2025 (CrewAI vs. AutoGen), RAG seguro arquitectures, RPA para legacy systems
- Mercado: REEM INEC 2023-2024 (SAM 76,562 MIPYMES), Ekos data, intención digitalización 91%, PIB -2.2% Q2 2024

**Aplicación a H3L**:
La investigación define completamente el roadmap de 90 días: Fase 1 (MVP Order-to-Cash para comercio), Fase 2 (industrialización de 3 agentes), Fase 3 (lanzamiento con lead magnet LOPDP).

---

## Ejercicio 2: Claude Code

**Carpeta de proyecto**: `/Users/hectorvelasco/Mis Empresas/H3L 25`

**Estructura creada**:
```
H3L 25/
├── Investigacion_Profunda_Mercado.md (211K - convertido de .docx)
├── Auditoria_Pagina.md (252K - convertido de .docx, referencia GoHighLevel)
├── Formularios Base/
│   ├── perfil-maestro-gpt-ready-1761928992820.md (imagemIA - referencia)
│   ├── Factor_Academy_Ejercicios_Semana1_2025-11-16.md (template vacío)
│   ├── factor-academy-modulo-2-2-presencia-digital-1763326063575.md (template vacío)
│   ├── factor_modulo_3_gpts.md (template vacío)
│   └── Formularios H3L/
│       ├── perfil-maestro-h3l.md (COMPLETADO - 72KB, identidad completa de marca)
│       ├── ejercicios-semana-1-h3l.md (COMPLETADO - diferenciación, océano azul, oferta, discovery, outreach)
│       ├── presencia-digital-h3l.md (COMPLETADO - landing page, LinkedIn, video strategy)
│       └── gpts-avanzados-h3l.md (ESTE ARCHIVO - en progreso)
└── env/ (entorno Python para posibles scripts de automatización)
```

**Archivos procesados con Claude Code**:
1. ✅ Conversión .docx → .md usando pandoc (Investigacion, Auditoria)
2. ✅ Lectura y análisis de investigación profunda (300+ líneas de análisis estratégico)
3. ✅ Lectura de formularios base (imagemIA como referencia estructural)
4. ✅ Creación de 4 formularios completos para H3L en carpeta "Formularios H3L"
5. ✅ Gestión de todo list con TodoWrite para trackear progreso

**Próximos pasos con Claude Code** (post-formularios):
- Desarrollar MVP del Portal CEO con RAG usando Next.js + LlamaIndex
- Implementar prototipo de Agente de Procesos (Order-to-Cash) con CrewAI
- Crear landing page www.h3l.ec con template V2 Professional Services
- Setup integración Tally.so + Zapier + ConvertKit para lead capture
- Desarrollar dashboard analytics interno para trackear métricas (leads, conversión, ROI clientes)

---

## Ejercicio 3: Crear GPT

**URL GPT Configurado**: [Pendiente - configurar en plataforma OpenAI GPTs cuando lancemos]

**GPTs prioritarios para H3L (según roadmap 90 días)**:

### GPT #1: Agente de Procesos (Order-to-Cash) - PRIORIDAD 1 (Semana 2 del roadmap)

**Propósito**: Automatizar ingreso de pedidos no estructurados (WhatsApp, email, PDFs) a ERP cliente, reduciendo tasa de error de 1-4% a <0.1%.

**Capabilities habilitadas**:
- ✅ Web Browsing (NO - no necesario para este agente)
- ✅ DALL·E Image Generation (NO - no necesario)
- ✅ Code Interpreter (SÍ - para parsear PDFs, extraer tablas de Excel, validar formatos)
- ✅ Function Calling (SÍ - crítico para llamar APIs ERP o ejecutar RPA)

**Instructions (Custom Instructions)**:
```
You are the "Agente de Procesos - Order-to-Cash" for H3L's AI audit platform, specialized in processing unstructured orders (WhatsApp messages, email PDFs, images) for Ecuadorian SMEs in the Commerce/Distribution sector.

## Your Mission
Intercept 100% of non-structured orders, extract data (SKU, quantity, customer RUC/ID, delivery address), validate against inventory and business rules, and auto-enter into client's ERP - flagging only exceptions for human review (HITL).

## Data Extraction Protocol
1. Receive input: WhatsApp text, email body, or PDF/image attachment
2. Extract key fields:
   - Customer ID (RUC Ecuador format: 13 digits, validate check digit)
   - Customer name and delivery address
   - Product SKUs (match against inventory database provided in knowledge base)
   - Quantities (validate numeric, flag if unusual - e.g., 10,000 units when avg order is 50)
   - Special instructions (delivery date, payment terms)
3. Validate extracted data:
   - RUC exists in customer database? (call function get_customer_by_ruc)
   - SKU exists in inventory with sufficient stock? (call function check_inventory)
   - Pricing matches current price list? (call function get_price)
4. Classify order:
   - ✅ AUTO-APPROVE: All validations pass, data complete, no anomalies
   - ⚠️ HUMAN REVIEW: Validation fails (unknown RUC, out of stock, unusual quantity, unclear product description)
   - ❌ REJECT: Clear spam, duplicate, or test order

## Output Format
For AUTO-APPROVE orders, generate JSON payload:
{
  "order_id": "auto-generated",
  "customer_ruc": "1234567890001",
  "customer_name": "Distribuidora XYZ",
  "line_items": [
    {"sku": "PROD-001", "description": "Producto A", "quantity": 50, "unit_price": 10.50, "total": 525.00}
  ],
  "subtotal": 525.00,
  "tax": 63.00,
  "total": 588.00,
  "delivery_address": "Av. Principal 123, Guayaquil",
  "notes": "Entregar antes de viernes",
  "confidence_score": 0.95,
  "action": "auto_approve"
}

For HUMAN REVIEW, generate:
{
  "order_id": "pending-review-001",
  "extracted_data": {...},
  "issues": ["RUC 9999999999001 not found in customer database", "SKU 'leche entera' ambiguous - matches 3 products"],
  "suggested_resolution": "Contact customer to confirm RUC, clarify if SKU is PROD-045, PROD-046, or PROD-047",
  "action": "human_review"
}

## Error Reduction Target
Reduce manual entry error rate from 1-4% industry baseline to <0.1% through:
- Structured validation (RUC check digit, SKU matching)
- Anomaly detection (flag unusual quantities, new customers, pricing discrepancies)
- HITL for ambiguous cases (don't guess, flag for human)

## Knowledge Base Files
You have access to:
- customer_database.csv (RUC, name, address, credit limit, payment terms)
- inventory_master.csv (SKU, description, category, current_stock, unit_price)
- business_rules.json (minimum order quantities, restricted SKUs, delivery zones)

## Function Calls Available
- get_customer_by_ruc(ruc: str) -> Customer object or None
- check_inventory(sku: str, quantity: int) -> {in_stock: bool, available_qty: int}
- get_price(sku: str, customer_ruc: str) -> float (applies customer-specific pricing)
- submit_order_to_erp(order_json: dict) -> {success: bool, erp_order_id: str} (only call for AUTO-APPROVE)
- flag_for_review(order_json: dict, issues: list) -> {review_ticket_id: str}

## Tone and Style
- Professional, concise, data-focused
- When flagging for review, explain WHY (don't just say "error", say "RUC not found - customer may be new, needs manual validation")
- Confidence scores: 0.95+ for auto-approve, <0.95 flag for review
- NEVER invent data (if customer name unclear, mark as "UNCLEAR - review needed", don't guess "Juan Pérez")

## Ecuador-Specific Context
- RUC format: 13 digits, last digit is check digit (validate using Modulo 11 algorithm)
- Common order channels: WhatsApp Business, email with PDF attachments, phone transcriptions
- Language: Spanish (Ecuadorian dialect - "chévere" for OK, "al toque" for ASAP)
- Currency: USD (no currency conversion needed)
- Tax: IVA 15% (apply to all orders unless customer is tax-exempt)

## ROI Impact
Your performance directly impacts H3L's client ROI. For a client with 3,000 orders/month:
- Baseline error rate: 1% = 30 errors/month = $1,500/month cost ($50/error avg)
- Target error rate: <0.1% = <3 errors/month = $150/month cost
- **Savings: $1,350/month = $16,200/year**
- Your accuracy is the ROI proof point for Order-to-Cash case study.
```

**Knowledge Base (archivos a subir cuando se cree el GPT)**:
- customer_database_sample.csv (100 clientes ficticios con RUCs válidos Ecuador)
- inventory_master_sample.csv (500 SKUs productos comunes en distribución - alimentos, bebidas, limpieza)
- business_rules_h3l_client.json (reglas de negocio estándar para MIPYME comercio)

**Testing plan**:
- Test Case 1: WhatsApp text "Hola quiero 50 cajas leche entera, RUC 1790123456001, entregar a Av. 9 de Octubre 123" → Debe extraer, validar RUC, buscar SKU "leche entera", auto-aprobar si todo OK
- Test Case 2: Email con PDF adjunto (factura escaneada con productos, cantidades, RUC) → Debe parsear PDF, extraer tabla, validar
- Test Case 3: Orden con RUC inválido → Debe flag for review "RUC check digit invalid"
- Test Case 4: Orden con SKU ambiguo "arroz" (matches 10 productos) → Debe flag for review "SKU ambiguous"

---

### GPT #2: Agente Legal/LOPDP - PRIORIDAD 2 (Semana 9 del roadmap, lead magnet)

**Propósito**: Auditar cumplimiento LOPDP, responder consultas sobre la ley, generar documentación de cumplimiento (DPAs, políticas privacidad, respuestas a Derechos de Titulares).

**Capabilities**:
- ✅ Web Browsing (SÍ - para buscar actualizaciones SUPERDATOS, casos recientes sanciones)
- ✅ Code Interpreter (SÍ - para parsear documentos internos cliente vía RAG, generar reportes)
- ✅ Function Calling (SÍ - para escanear repositorios SharePoint/Google Drive en busca de PII no seguro)

**Instructions**:
```
You are the "Agente Legal/LOPDP" for H3L, specialized in Ecuador's Ley Orgánica de Protección de Datos Personales (LOPDP) compliance for SMEs.

## Your Mission
1. Audit client repositories (SharePoint, network folders, Google Drive) to identify exposed PII (cédulas, nombres, salarios, datos médicos)
2. Answer legal queries about LOPDP (Art. 9, 12, 16, 21, 41, 50) in plain Spanish for non-lawyer SME owners
3. Generate compliance documentation (DPAs, privacy policies, responses to Data Subject Rights requests)
4. Quantify legal risk (potential fines = 1% of annual revenue per Art. 50 LOPDP)

## Knowledge Base (LOPDP Law + Reglamento)
You have access to:
- LOPDP_Ley_Organica.pdf (full text of law)
- LOPDP_Reglamento.pdf (regulations)
- SUPERDATOS_casos_2024.md (compilation of recent sanctions, anonymized)
- DPA_template_Art41.docx (Data Processing Agreement template compliant with Art. 41)

## Query Response Protocol
When CEO/CFO asks: "¿Necesitamos un DPO?" (Do we need a DPO?)

Your answer:
"Según el Art. 34 de la LOPDP, están obligados a designar un Delegado de Protección de Datos (DPO) si:
1. Su empresa es una entidad pública, o
2. Su actividad principal es el tratamiento de datos a gran escala (ej. big data, marketing masivo), o
3. Tratan datos sensibles de forma habitual (ej. clínica con historias clínicas, financiera con datos crediticios).

Para una MIPYME de comercio/manufactura con [X] empleados que NO trata datos sensibles a gran escala, NO es obligatorio tener un DPO designado formalmente.

**PERO** (y esto es crítico): Aunque no sea obligatorio, ustedes SÍ deben cumplir con TODOS los artículos de la LOPDP:
- Art. 9: Obtener consentimiento explícito antes de tratar datos personales
- Art. 12: Informar a los titulares sobre qué datos recopilan y para qué (Derecho a la Información)
- Art. 41: Firmar un Acuerdo de Procesamiento de Datos (DPA) con cada proveedor tecnológico que accede a datos personales (ej. H3L, su proveedor de nómina, su hosting provider)
- Art. 21: Si usan valoraciones automatizadas (ej. nuestros agentes de IA), deben poder explicar las decisiones

Si no tienen un DPO interno (salario $2,500-3,500/mes, inaccesible para MIPYME), H3L puede actuar como su 'DPO-as-a-Service' externo mediante nuestro Agente Legal/LOPDP que:
- Audita sus repositorios en busca de PII expuesto
- Genera la documentación de cumplimiento
- Responde Derechos de Titulares (Art. 12-18) en los plazos legales (15 días hábiles)

Riesgo de no cumplir: Multa de hasta 1% de su facturación anual (Art. 50). Para una MIPYME con $2M/año, esto es $20,000. SUPERDATOS está activo y sancionando."

## PII Audit Protocol
When scanning client repository (via function call scan_repository(path)):
1. Identify files containing PII:
   - Cédulas ecuatorianas (10 digits format)
   - Nombres + apellidos + dirección
   - Salarios, datos bancarios
   - Datos médicos (si aplica)
2. Classify exposure level:
   - 🔴 HIGH RISK: PII in unencrypted shared folder, public cloud link, email attachments sent externally
   - 🟡 MEDIUM RISK: PII in encrypted folder but no access controls (anyone in company can access)
   - 🟢 LOW RISK: PII in encrypted, access-controlled system with audit logs
3. Generate report:
   - Files at risk: [list file names, paths]
   - Type of PII exposed: [cédulas, salarios, etc.]
   - Estimated # of data subjects affected: [X employees, Y customers]
   - Legal articles violated: [Art. X, Y, Z]
   - Recommended remediation: [encrypt folder, restrict access, implement DPA with vendor, delete unnecessary copies]
   - Quantified risk: "If SUPERDATOS audits and finds this, potential fine = 1% of $[revenue] = $[fine amount]"

## DPA Generation (Art. 41)
When client asks: "Genera un DPA para firmar con H3L"

Load DPA_template_Art41.docx, fill placeholders:
- [RESPONSABLE]: Client company name, RUC, legal representative
- [ENCARGADO]: H3L S.A., RUC [pending], Héctor Velasco CEO
- [OBJETO]: "Procesamiento de datos empresariales y personales mediante plataforma de auditoría de IA de H3L, incluyendo: [list specific data types: facturas, pedidos, contratos, datos de empleados si aplica]"
- [MEDIDAS SEGURIDAD]: "Cifrado AES-256 en reposo, TLS 1.3 en tránsito, RAG Seguro con anonimización vía Presidio, trazabilidad de decisiones agentes IA, acceso RBAC con MFA"
- [PLAZO]: Duration of service contract (ej. 12 meses for Enterprise retainer)
- [SUBCESSION]: "El Encargado (H3L) podrá subcontratar servicios de cloud (AWS/Azure) y APIs de IA (Anthropic/OpenAI), siempre que dichos subencargados cumplan con medidas de seguridad equivalentes y estén listados en Anexo A" (compliance with Art. 43 LOPDP)

Output: DPA_H3L_[ClientName]_2025.docx ready for legal review and signature

## Tone and Style
- Authoritative but accessible (explain legal jargon in plain Spanish)
- Risk-focused (always quantify potential fines)
- Solution-oriented (don't just say "you're non-compliant", say "here's how to fix it in 3 steps")
- Ecuador-specific (reference local law, SUPERDATOS, not generic GDPR)

## ROI Impact
Your performance = lead magnet effectiveness. For "Auditoría LOPDP Gratuita 14 días":
- Scan client repository in 2-4 hours (vs. lawyer 2-3 days manual)
- Generate report identifying $20k+ risk (1% fine)
- Convert 40-50% of audits to Paquete Pro ($5,500) because we demonstrated the risk is REAL
```

**Knowledge Base**:
- LOPDP_Ley_Organica.pdf (official text from Registro Oficial)
- LOPDP_Reglamento.pdf
- SUPERDATOS_casos_2024.md (investigar casos públicos recientes, anonimizar, documentar)
- DPA_template_Art41.docx (plantilla legal revisada por abogado ecuatoriano experto en datos)

---

### GPT #3: Agente de Decisión (Portal CEO con RAG) - PRIORIDAD 1 (Semana 3-4 roadmap, incluido en Pro)

**Propósito**: Responder consultas del CEO sobre documentos internos (contratos, políticas, procedimientos) en lenguaje natural, con RAG Seguro.

**Capabilities**:
- ✅ Web Browsing (NO)
- ✅ Code Interpreter (SÍ - para parsear documentos upload del cliente)
- ✅ Function Calling (SÍ - para llamar vector DB vía LlamaIndex)

**Instructions**:
```
You are the "Agente de Decisión - Portal CEO" for H3L, providing instant answers to CEO/CFO queries about their internal documentation.

## Your Mission
The CEO should be able to ask: "¿Cuál es la cláusula de terminación del contrato con Cliente X?" and get an answer in 10 seconds with citations to source documents, instead of spending 30 min searching PDFs.

## RAG Protocol (LlamaIndex Integration)
When CEO submits query:
1. Convert query to embedding vector (using multilingual-e5-small model for Spanish)
2. Retrieve top 5 most relevant chunks from vector DB (client's document repository)
3. **CRITICAL - Privacy**: Before sending chunks to LLM (me), anonimizar PII using Presidio middleware:
   - Mask cédulas: "1712345678" → "[CEDULA_XXX]"
   - Mask nombres propios: "Juan Pérez" → "[NOMBRE_EMPLEADO_1]"
   - Mask salarios: "$2,500" → "[$SALARIO_XXX]"
4. Send anonimized chunks + query to me (LLM)
5. I generate answer based on chunks
6. System de-anonimizes answer before showing to CEO (CEO has permission to see full data, de-anonymization only affects logging/audits for Art. 21 compliance)

## Answer Format
Query: "¿Cuál es la cláusula de terminación del contrato con Cliente X?"

Answer:
"Según el contrato firmado el [FECHA] con Cliente X (documento: Contrato_ClienteX_2024.pdf, página 8, sección 12.3), la cláusula de terminación establece:

> 'Cualquiera de las partes podrá terminar el presente contrato con un preaviso de 30 días calendario, notificando por escrito a la contraparte. En caso de incumplimiento material, la parte afectada podrá terminar de inmediato sin preaviso.'

**Resumen**: Pueden terminar con 30 días de aviso escrito, o inmediatamente si Cliente X incumple gravemente.

**Fuente**: Contrato_ClienteX_2024.pdf, Sección 12.3 'Terminación', página 8."

## Handling Ambiguity
If query is ambiguous (ej. "¿Cuál es nuestra política de vacaciones?" but there are 3 policy documents from different years):

Answer:
"Encontré 3 documentos relacionados con política de vacaciones:
1. Politica_Vacaciones_2022.pdf (vigente hasta dic 2023) - 15 días hábiles/año
2. Politica_Vacaciones_2024.pdf (vigente desde ene 2024) - 18 días hábiles/año + 3 días adicionales por antigüedad >5 años
3. Manual_Empleado_2024.pdf, Sección 4.2 (referencia a Politica_Vacaciones_2024.pdf)

La política actualmente vigente es: **18 días hábiles/año**, con 3 días adicionales si el empleado tiene más de 5 años en la empresa.

**Fuente**: Politica_Vacaciones_2024.pdf, página 2."

## When to Say "I Don't Know"
If no relevant chunks retrieved (similarity score <0.6), respond:
"No encontré información sobre [QUERY] en los documentos indexados actualmente. Los documentos indexados son: [list categories: Contratos, Políticas Internas, Procedimientos Operativos, etc.].

¿El documento que busca podría estar en una carpeta no indexada, o tiene otro nombre?"

NEVER invent information. Better to say "no sé" than to hallucinate a fake answer.

## Supported Document Types
- Contratos (con clientes, proveedores, empleados)
- Políticas internas (vacaciones, gastos, código de conducta)
- Procedimientos operativos (SOPs, manuales)
- Normativa externa (LOPDP si client uploaded it for reference)

## Tone
- Concise, executive summary style (CEO wants answer, not essay)
- ALWAYS cite sources (document name, page, section)
- If answer is long (>200 words), start with TL;DR bullet point, then detail

## ROI Impact
Your performance = key feature of Paquete Pro.
- Avg time CEO spends finding info in documents: 20-30 min/query
- With you: 10-30 seconds
- If CEO queries 5x/week: saves 2.5 hours/week = 10 hours/month = $500/month in CEO time (assuming CEO hourly rate $50)
- Annual ROI of this feature alone: $6,000
- This justifies a significant portion of Pro's $5,500 price
```

**Knowledge Base (varies per client)**:
Each client has their own isolated tenant with their documents. For demo/testing purposes, create sample repository:
- Contrato_ClienteA_2024.pdf
- Politica_Vacaciones_2024.pdf
- Manual_Empleado_2024.pdf
- Procedimiento_Compras_v2.docx
- LOPDP_Ley_Organica.pdf (if client wants legal reference)

---

## Ejercicio 4: Knowledge Base

**Accuracy target**: >95% for Agente de Procesos (Order-to-Cash), >98% for Agente Legal/LOPDP (legal compliance is high-stakes)

**Knowledge Base por GPT**:

### KB Agente de Procesos (Order-to-Cash)
**Archivos**:
1. **customer_database.csv** (generado sintéticamente):
   - Campos: ruc, customer_name, address, city, credit_limit_usd, payment_terms_days, status
   - 100-500 registros con RUCs válidos Ecuador (validar check digit con Modulo 11)
   - Incluir edge cases: clientes suspendidos (status='suspended'), límite crédito alcanzado
2. **inventory_master.csv**:
   - Campos: sku, description, category, unit_of_measure, current_stock, unit_price_usd, reorder_point
   - 500-1,000 SKUs productos típicos de distribuidora ecuatoriana (alimentos: arroz, aceite, leche; bebidas: Coca-Cola, agua; limpieza: detergente, cloro)
   - Incluir SKUs ambiguos: "arroz" (matches ARROZ-EXTRA, ARROZ-CORRIENTE, ARROZ-INTEGRAL)
3. **business_rules.json**:
   ```json
   {
     "min_order_value_usd": 50.00,
     "max_order_value_without_approval_usd": 5000.00,
     "restricted_skus": ["PROD-ALCOHOL-001"], // requires special license
     "delivery_zones": {
       "Guayaquil": {"delivery_fee": 0, "delivery_days": 1},
       "Quito": {"delivery_fee": 25, "delivery_days": 2},
       "Cuenca": {"delivery_fee": 35, "delivery_days": 3}
     },
     "tax_rate_iva": 0.15
   }
   ```
4. **order_history_sample.csv** (para detectar anomalías):
   - Últimos 1,000 pedidos del cliente ficticio
   - Campos: order_id, customer_ruc, order_date, total_usd, status
   - Permite detectar: "Cliente X nunca pide >100 unidades, hoy pide 1,000 → flag for review"

**Accuracy improvement tactics**:
- Regular updates de inventory_master.csv cuando stock cambia (integración con ERP real del cliente)
- Feedback loop: Cuando agente flag for review y humano corrige, agregar a training examples (fine-tuning futuro)
- A/B testing de prompts: Version A "extract SKU exactly as written" vs. Version B "extract SKU and suggest closest match from inventory"

### KB Agente Legal/LOPDP
**Archivos**:
1. **LOPDP_Ley_Organica.pdf**: Descargar de Registro Oficial, texto completo 50+ páginas
2. **LOPDP_Reglamento.pdf**: Reglamento ejecutivo
3. **SUPERDATOS_casos_2024.md**: Compilar casos públicos (investigar en web SUPERDATOS, noticias Ekos/El Comercio sobre sanciones). Anonimizar empresas. Formato:
   ```markdown
   # Caso 1: Sanción por falta de DPA
   **Fecha**: Marzo 2024
   **Empresa**: [ANONIMIZADA - Sector Retail]
   **Infracción**: No tenía firmado DPA (Art. 41) con proveedor de nómina que procesaba datos de 200 empleados
   **Multa**: $15,000 (empresa facturaba ~$1.5M/año, 1% = $15k)
   **Lección**: DPA no es opcional si tercero procesa datos personales
   ```
4. **DPA_template_Art41.docx**: Plantilla legal revisada por abogado ecuatoriano, compliance Art. 41-43 LOPDP
5. **FAQs_LOPDP_MIPYMES.md**: Document common questions y answers (built from Discovery calls). Ej:
   - Q: "¿Puedo enviar facturas con datos clientes por email sin encriptar?" A: "NO..."
   - Q: "¿Cuánto tiempo puedo guardar CVs de candidatos no contratados?" A: "Art. 15..."

**Accuracy improvement**:
- Verificar todas las citas legales con texto oficial (no parafrasear, citar exacto)
- Cross-check con abogado experto en datos cada 3 meses (as LOPDP reglamento evolves)
- Test adversarial: Hacer preguntas tramposas ("¿Puedo vender base de datos de clientes?") y verificar que agente responde "NO, Art. X prohíbe..."

### KB Agente de Decisión (Portal CEO)
**Archivos (por cliente, multi-tenant)**:
- Variable según cliente. Para demo: 5-10 documentos sample (contratos, políticas).
- **Critical**: Implementar upload workflow seguro:
  1. Cliente sube documento via Portal CEO (drag-and-drop)
  2. Sistema escanea con antivirus
  3. Extrae texto (PDFs: PyPDF2, DOCX: python-docx)
  4. Chunking (500-1000 tokens/chunk con overlap 100 tokens)
  5. Vectorización con multilingual-e5-small (optimizado para español)
  6. Almacena en Qdrant vector DB (tenant aislado por client_id)
  7. Indexa metadata (doc_name, upload_date, category, source_path)

**Accuracy improvement**:
- Test retrieval quality: Para cada documento, crear 5-10 preguntas gold standard, medir recall (% de preguntas que retrieval encuentra respuesta correcta en top 5 chunks)
- Threshold de similarity: Si similarity score <0.6, no usar chunk (evita hallucinations)
- Prompt engineering: "Use ONLY information from retrieved documents. If answer not found, say 'No information available'."

---

## Ejercicio 5: Portal (Cliente Piloto)

**Cliente piloto target**: Distribuidora de Alimentos Sector Comercio, 60-80 empleados, Guayaquil

**Timeline despliegue Portal CEO (parte del Paquete Pro, 4-6 semanas)**:

### Semana 1-2: Discovery y Shadowing
- Workshop Discovery (4h): Identificar 1 repositorio clave para conectar (ej. carpeta contratos con clientes en SharePoint)
- Shadowing (8h total, 2 sesiones): Observar cómo CEO/CFO actualmente busca info en documentos (tiempo promedio: 20-30 min/búsqueda)
- Entregable: Lista de 20-30 consultas frecuentes del CEO (para crear test queries)

### Semana 3: Implementación técnica
- **Día 1-2**: Setup infraestructura
  - Deploy backend: Next.js API routes en Vercel
  - Setup Qdrant vector DB (cloud managed, tier gratuito 1GB suficiente para piloto)
  - Configurar auth (NextAuth con Google OAuth para CEO, multi-factor con Authenticator app)
- **Día 3**: Ingesta de documentos piloto
  - Cliente proporciona acceso a carpeta SharePoint "Contratos Clientes" (20-30 PDFs)
  - Script de ingesta: download → parse → chunk → vectorize → store en Qdrant tenant "cliente_piloto_001"
- **Día 4**: Implementar RAG Seguro
  - Integrar Presidio para anonimización PII
  - Setup LlamaIndex query engine con custom prompt (instructions del GPT #3)
  - Test con 5 queries sample
- **Día 5**: Desarrollar frontend Portal CEO
  - Chat interface (Vercel AI SDK + React)
  - Historial de queries (para analytics: qué busca CEO más frecuentemente)
  - Upload de nuevos documentos (drag-and-drop → auto-indexa)

### Semana 4: Testing y Capacitación
- **Testing interno** (Día 1-2):
  - Ejecutar 20-30 test queries (creadas en Discovery)
  - Medir accuracy: ¿Responde correctamente? ¿Cita fuentes?
  - Medir latency: <5 segundos query-to-answer (target)
- **Capacitación CEO** (Día 3, sesión 2h):
  - Demo uso: Cómo hacer query, cómo interpretar respuestas con citas
  - Demo upload: Cómo agregar nuevos documentos al índice
  - Best practices: Cómo hacer preguntas específicas (buenos: "¿Cuál es el plazo de pago en contrato Cliente X?", malos: "Cuéntame todo sobre contratos")
- **Go-live** (Día 4-5):
  - CEO empieza a usar en producción
  - H3L monitorea queries diarias vía dashboard (detectar errores, queries sin respuesta)
  - Iteración rápida: Si CEO pregunta algo y no hay respuesta, agregar documentos faltantes

### Métricas de éxito (30 días post-go-live):
- **Queries/día**: 3-5 queries (CEO usa activamente, no olvidó la herramienta)
- **Accuracy**: >90% de queries obtienen respuesta correcta con cita a fuente (medir vía feedback del CEO: thumbs up/down en cada respuesta)
- **Time saved**: CEO reporta reducción de 20-30 min/búsqueda a <1 min. Si 5 búsquedas/semana, ahorro = 100-150 min/semana = 6-10 h/mes.
- **CEO satisfaction score**: 8/10+ (encuesta post-30 días)
- **Testimonial**: CEO acepta ser case study: "El Portal CEO me ahorra 10 horas al mes buscando contratos. Antes perdía 30 min cada vez que necesitaba confirmar una cláusula. Ahora toma 30 segundos."

---

## Ejercicio 6: Seguridad (Baúl de Seguridad)

**Baúl de seguridad implementado**: ✅ SÍ (LOPDP-First es pilar de arquitectura)

**Componentes del Baúl de Seguridad H3L**:

### 1. Cifrado en Reposo (AES-256)
- **Qué**: Todos los datos del cliente (documentos, vectores, logs) almacenados cifrados en DB
- **Cómo**:
  - Qdrant vector DB: configuración `encryption_at_rest: true` (usa AES-256 managed by cloud provider)
  - PostgreSQL (metadata): AWS RDS con encryption enabled
- **Validación**: Auditoría trimestral (verificar config no fue alterada)

### 2. Cifrado en Tránsito (TLS 1.3)
- **Qué**: Toda comunicación cliente↔Portal CEO↔Backend↔Vector DB↔LLM APIs cifrada
- **Cómo**:
  - Vercel auto-provisiona SSL cert (Let's Encrypt) para dominio custom portal.h3l.ec
  - Backend API calls a Qdrant: `https://` con TLS 1.3 enforced
  - Calls a Anthropic API (Claude): TLS 1.3 (Anthropic garantiza esto en su infra)
- **Validación**: SSL Labs test mensual (score A+ requerido)

### 3. Anonimización PII vía Presidio (RAG Seguro)
- **Qué**: Antes de enviar chunks de documentos a LLM externo (Claude), enmascarar PII
- **Cómo**:
  - Middleware Presidio (Python library de Microsoft) integrado en pipeline RAG
  - Detecta y enmascara: cédulas Ecuador (regex pattern \d{10}), nombres propios (NER model), emails, teléfonos, salarios (regex $\d+)
  - Ejemplo: Chunk original "Juan Pérez, cédula 1712345678, salario $2,500" → Chunk anonimizado "[NOMBRE_1], cédula [CEDULA_1], salario [$SALARY_1]"
  - LLM recibe chunk anonimizado, genera respuesta anonimizada
  - Sistema de-anonimiza antes de mostrar a CEO (CEO tiene permiso ver datos completos)
- **Validación**: Test unitarios (100 documentos sample con PII variado, verificar 100% detección)

### 4. Autenticación Zero-Trust (MFA + RBAC)
- **Qué**: Solo usuarios autorizados acceden a Portal CEO, con multi-factor
- **Cómo**:
  - NextAuth con Google OAuth (CEO usa email corporativo @cliente.com)
  - MFA mandatorio: Google Authenticator app (TOTP)
  - RBAC: Roles "CEO" (full access), "CFO" (full access), "Gerente Ops" (read-only si cliente quiere)
- **Validación**: Pentest anual (simular ataque credential stuffing, phishing)

### 5. DPA (Acuerdo de Procesamiento de Datos) Art. 41 LOPDP
- **Qué**: Contrato legal entre H3L (Encargado) y Cliente (Responsable) definiendo obligaciones
- **Cómo**:
  - Template DPA (creado por Agente Legal/LOPDP, revisado por abogado ecuatoriano)
  - Firmado ANTES de iniciar proyecto (no negociable)
  - Cláusulas clave:
    - Objeto del tratamiento (qué datos procesa H3L)
    - Medidas de seguridad (las 7 listadas aquí)
    - Plazo (duración del contrato de servicio)
    - Subcesión (H3L puede usar AWS, Anthropic, Qdrant como subencargados con medidas equivalentes)
    - Derechos de auditoría (Cliente puede auditar compliance de H3L anualmente)
- **Validación**: 100% de clientes firman DPA antes de go-live (checklist legal mandatorio)

### 6. Trazabilidad de Decisiones (Art. 21 LOPDP - Derecho a Explicación)
- **Qué**: Logging de cada decisión de agente IA (para cumplir derecho del titular a explicación)
- **Cómo**:
  - Helicone o Langfuse (plataformas de observability LLM)
  - Log de cada query a Agente de Decisión:
    - `query_id`, `user_id` (CEO), `query_text`, `retrieved_chunks` (con source citations), `llm_response`, `timestamp`, `latency_ms`
  - Si empleado ejerce Derecho de Oposición (Art. 16): "El agente IA dijo que mi rendimiento es bajo, quiero saber por qué"
    - H3L puede mostrar: `query_id: 12345, chunks: [performance_review_2024.pdf, page 3, "Employee X: KPI achievement 60% vs target 85%"], llm_response: "Rendimiento 25% below target"`
    - Explicación basada en hechos documentados, no "caja negra"
- **Validación**: 100% de queries loggeadas, retención 12 meses (compliance con Art. 15 LOPDP sobre plazo conservación datos)

### 7. Política de Retención y Eliminación de Datos (Art. 15 LOPDP)
- **Qué**: No conservar datos personales más tiempo del necesario
- **Cómo**:
  - Cuando cliente cancela servicio (churn):
    - Opción A (Cliente solicita): Eliminar todos sus datos (documentos, vectores, logs) en 30 días
    - Opción B (Cliente acepta): H3L conserva datos anonimizados (sin PII) para mejora de modelos, por 12 meses adicionales, luego elimina
  - Auto-delete de logs >12 meses (script cron mensual)
- **Validación**: Proceso de offboarding documentado, cliente firma "Certificado de Eliminación de Datos" post-delete

### 8. Auditoría Externa Anual (Opcional pero recomendado)
- **Qué**: Auditor independiente certifica compliance LOPDP
- **Cómo**:
  - Contratar firma de ciberseguridad ecuatoriana (ej. expertos en ISO 27001, LOPDP)
  - Scope: Revisar arquitectura, configs, DPAs, procesos de anonimización, logs
  - Entregable: Reporte de auditoría con hallazgos y recomendaciones
- **Timing**: Después de primeros 5-10 clientes Enterprise (cuando riesgo acumulado justifica costo ~$3k-5k auditoría)
- **Beneficio**: Reporte de auditoría se convierte en herramienta de ventas ("Somos la única agencia IA en Ecuador con certificación de auditoría LOPDP externa")

**ROI del Baúl de Seguridad**:
- **Costo**: $0-500/mes (mayoría es built-in en arquitectura, Presidio es open-source, Helicone tier gratis, SSL gratis con Vercel)
- **Valor**:
  - Evita multas LOPDP (potencial $20k+ por cliente si fuéramos non-compliant y SUPERDATOS audita)
  - Diferenciador de ventas (neutraliza objeción #4 "seguridad de datos")
  - Habilita lead magnet "Auditoría LOPDP Gratuita" (no podemos auditar a otros si no cumplimos nosotros)

**Baúl implementado**: ✅ SÍ

---

## Ejercicio 7: Testing (Ready para Producción)

**Ready para producción**: ❌ NO (aún) - Roadmap para estar Ready:

### Semana 1-4 (MVP Development - En progreso según roadmap 90 días)
- [X] Investigación profunda completada ✅
- [X] Formularios completados (identidad marca, estrategia) ✅
- [ ] Desarrollo MVP Agente de Procesos (Order-to-Cash) - **En progreso Semana 2-3 roadmap**
- [ ] Portal CEO básico con RAG - **En progreso Semana 3-4 roadmap**
- [ ] Landing page www.h3l.ec live - **Semana 1 roadmap Plan Acción**

### Semana 5-8 (Testing y Cliente Piloto)
- [ ] **Unit testing Agente de Procesos**:
  - 100 pedidos test (WhatsApp, email, PDF)
  - Validar accuracy >95% (extracción SKU, RUC, cantidades)
  - Validar HITL correcto (flag ambiguos, no auto-aprobar dudosos)
- [ ] **Integration testing Portal CEO**:
  - Upload 30 documentos sample
  - Ejecutar 50 queries test
  - Medir accuracy >90%, latency <5s
- [ ] **Security testing**:
  - Verificar anonimización PII funciona (Presidio detecta 100% cédulas, nombres en 100 docs test)
  - Verificar MFA funciona (intentar login sin MFA → debe fallar)
  - Verificar RBAC (usuario "Gerente Ops" no debe poder borrar documentos si rol es read-only)
- [ ] **Cliente piloto onboarding** (Semana 7-8):
  - Firma DPA ✅
  - Capacitación equipo (2h) ✅
  - Go-live Agente Procesos + Portal CEO
  - Monitoreo diario primeros 7 días (H3L responde incidencias <4h)

### Semana 9-12 (Refinamiento y Lanzamiento)
- [ ] **Feedback loop cliente piloto**:
  - Recopilar errores Agente Procesos (si flagged for review correcto, si auto-aprobó incorrecto)
  - Iterar prompt engineering (reducir false positives)
  - Agregar SKUs faltantes a knowledge base
- [ ] **Performance optimization**:
  - Portal CEO latency: optimizar chunking, indexing (target <3s query-to-answer)
  - Costos API: validar que Router Multi-IA usa Haiku 90% del tiempo (no Sonnet innecesariamente)
- [ ] **Case study creation**:
  - Documentar ROI real del piloto (ej. "Reducción errores de X% a Y%, ahorro $Z/mes")
  - CEO piloto acepta ser testimonial
  - Publicar case study en landing + LinkedIn
- [ ] **Ready para producción**: ✅ SÍ (Semana 12)
  - Criteria:
    - [ ] Agente Procesos accuracy >95% validado en producción (cliente piloto 30 días)
    - [ ] Portal CEO accuracy >90%, CEO piloto satisfaction 8/10+
    - [ ] 0 incidencias seguridad críticas (no leaks PII, no downtime >1h)
    - [ ] Case study publicado (social proof para vender a próximos clientes)
    - [ ] Playbook de onboarding documentado (para escalar a clientes 2, 3, 4...)

**Timeline Ready for Production**: **Día 84 del roadmap 90 días** (finales Semana 12)

**Próximos clientes post-piloto**:
- Clientes 2-3: Semana 13-16 (usando learnings del piloto, onboarding más rápido 3-4 semanas)
- Meta Mes 4-6: 3-5 clientes Pro activos, 1-2 clientes Enterprise en pipeline

---

## Resumen del Módulo 3 (GPTs Avanzados) para H3L

**Logros**:
1. ✅ Definido stack técnico completo (CrewAI, LlamaIndex, Presidio, Qdrant, Claude Haiku/Sonnet)
2. ✅ Diseñado 3 GPTs prioritarios (Procesos, Legal/LOPDP, Decisión) con instructions completas listas para implementar
3. ✅ Especificado knowledge bases por agente (customer DB, inventory, LOPDP law, client docs)
4. ✅ Implementado "Baúl de Seguridad" LOPDP-First (cifrado, anonimización, MFA, DPA, trazabilidad)
5. ✅ Definido roadmap testing y criterios Ready for Production (Semana 12 del plan 90 días)

**Próximos pasos (post-formularios)**:
1. **Semana 1-2**: Ejecutar Plan Acción Presencia Digital (landing live, LinkedIn optimizado)
2. **Semana 2-4**: Desarrollar MVP Agente Procesos + Portal CEO (código real con Claude Code / Cursor)
3. **Semana 5-8**: Testing + Cliente piloto onboarding
4. **Semana 9-12**: Refinamiento + Case study + Lanzamiento full

**Ready**: ❌ NO (aún) → ✅ SÍ (Semana 12 si roadmap se ejecuta según plan)

---

*Factor Agents Academy - Módulo 3 GPTs Avanzados completado para H3L*
*Todos los formularios base completados. H3L está lista para ejecución.*
