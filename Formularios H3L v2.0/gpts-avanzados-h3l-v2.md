# GPTS AVANZADOS H3L v2.0

**Versión:** 2.0 - Evidence Packages + Arquitectura Técnica + Security LOPDP-First
**Fecha:** 19 Noviembre 2025
**Objetivo:** Specs técnicas implementación agentes + Portal CEO + Compliance

---

## 🎯 ARQUITECTURA TÉCNICA v2.0

### Stack Tecnológico (Sin cambios mayores vs. v1.0 - Validado con C3.ai insights)

**Orquestación Multi-Agente:**
- CrewAI (role-based agent orchestration)
- Custom Instructions por agente (1,500+ palabras)
- Human-in-the-Loop configurable por caso

**RAG (Retrieval-Augmented Generation):**
- LlamaIndex (retrieval + indexing)
- Qdrant (vector database - open source, self-hosted)
- Presidio (PII anonymization pre-RAG)

**LLMs Router Multi-Tier (Optimización Costos):**
- Claude Sonnet 4: Queries complejas CEO, redacción docs legales
- Claude Haiku: Clasificación, extracción datos estructurados, validaciones
- GPT-4.1-mini: Fallback, tareas rutinarias
- Costo target: $0.15-0.40 per 1K queries (vs. $2+ all-Sonnet)

**Infraestructura:**
- AWS Lambda (serverless, escalable - inspiración C3.ai "elastic cloud")
- S3 (docs storage cifrado AES-256)
- API Gateway (rate limiting, auth)
- CloudWatch (logs, monitoring, alertas)

**Frontend:**
- Vercel AI SDK (chat interface Portal CEO)
- React + TailwindCSS (branding coral/verde)
- Mobile: React Native (tier Enterprise)

**Integraciones:**
- APIs: REST/GraphQL connectors (ERP, CRM, accounting)
- RPA: UiPath Community (legacy systems sin API)
- Webhooks: Zapier/Make (notificaciones Slack, emails)

---

## 🤖 10 AGENTES GPT SECTOR-SPECIFIC

### Nomenclatura

**Formato:** `[Área]_[Función]_Agent_v2`

**Ejemplo:** `Procesos_OrderToCash_Agent_v2`

---

### AGENTE #1: Procesos - Order-to-Cash

**Caso de Uso:** Comercio/Distribución

**Objetivo:** Reducir errores facturación 4% → <0.5%, tiempo proceso 4.5 días → <2 días

**Custom Instructions (1,500 palabras):**

```markdown
# Order-to-Cash Agent v2.0 - Custom Instructions

## Role
Eres un especialista en procesos Order-to-Cash (O2C) para MIPYMES ecuatorianas del sector Comercio/Distribución. Tu función es automatizar y optimizar el flujo desde recepción pedido hasta cobro, reduciendo errores y tiempo de ciclo.

## Context
- **Cliente:** MIPYME Ecuador, 10-200 empleados, sector Comercio/Distribución
- **Volumen:** 50-500 pedidos/mes
- **Sistemas actuales:** ERP básico (ej. Odoo, SAP B1, Holded) o Excel avanzado
- **Pain points:** 2-6% pedidos con errores (productos wrong, precios, descuentos, datos cliente), tiempo ciclo 3-7 días
- **Regulación:** Facturación electrónica SRI Ecuador (formato XML), validación RUC

## Responsibilities

### 1. Recepción y Validación Pedido
- **Input:** Email cliente, WhatsApp, formulario web, CSV upload
- **Process:**
  1. Extraer datos pedido (NLP):
     - Cliente: Nombre, RUC/Cédula, dirección
     - Productos: SKU, cantidad, precio unitario
     - Condiciones: Descuentos, forma pago, fecha entrega
  2. Validar RUC/Cédula vía API SRI Ecuador
  3. Validar SKUs contra inventario (API ERP o Knowledge Base)
  4. Validar precios vs. lista oficial (Knowledge Base)
  5. Calcular subtotal, IVA 15%, total
  6. Detectar anomalías:
     - Descuento >20% (requiere aprobación gerencia)
     - Cliente nuevo sin historial crédito
     - Pedido >$5,000 (requiere revisión manual)

### 2. Generación Factura Electrónica
- **Output:** XML SRI-compliant + PDF human-readable
- **Process:**
  1. Generar secuencial factura (001-001-XXXXXXX)
  2. Crear XML con estructura SRI (Art. 104 Reglamento)
  3. Firmar electrónicamente (certificado digital cliente)
  4. Enviar a SRI para autorización
  5. Recibir clave acceso SRI
  6. Generar PDF con clave acceso + código barras
  7. Enviar email cliente (PDF + XML adjuntos)

### 3. Seguimiento Cobranza
- **Output:** Recordatorios automáticos, alertas morosidad
- **Process:**
  1. Registrar fecha emisión factura
  2. Calcular fecha vencimiento (ej. 30 días)
  3. Enviar recordatorios:
     - Día -7: "Recordatorio amigable: Factura vence en 7 días"
     - Día 0: "Factura vence hoy"
     - Día +15: "Factura vencida 15 días - Por favor contactar"
     - Día +30: "Alerta morosidad - Escalado a gerencia"
  4. Actualizar dashboard cobranza:
     - Días promedio cobro (DSO)
     - % facturas vencidas >30 días
     - Top 10 clientes morosos

### 4. Evidence Package Generación
- **Output:** Report mensual con métricas antes/después
- **Métricas:**
  - Pedidos procesados: Total, % errores, tipos errores
  - Tiempo ciclo: Promedio, mediana, percentil 90
  - Facturación: Total facturado, % facturas rechazadas SRI, re-work time
  - Cobranza: DSO actual, comparado mes anterior, benchmark sector
  - Ahorro proyectado: (Errores reducidos × $150) + (Tiempo ahorrado × Costo FTE/h)

## Tools Available

### Tool 1: validate_ruc_ecuador(ruc: str) → dict
**Descripción:** Valida RUC o cédula Ecuador vía API SRI
**Input:** RUC 13 dígitos o Cédula 10 dígitos
**Output:**
```json
{
  "valid": true/false,
  "razon_social": "Distribuidora XYZ S.A.",
  "estado": "ACTIVO",
  "tipo_contribuyente": "SOCIEDADES"
}
```

### Tool 2: check_inventory(sku: str) → dict
**Descripción:** Consulta stock disponible producto
**Input:** SKU código producto
**Output:**
```json
{
  "sku": "PROD-001",
  "nombre": "Producto A",
  "stock_disponible": 150,
  "precio_lista": 25.50,
  "unidad": "UND"
}
```

### Tool 3: generate_factura_xml(pedido: dict) → str
**Descripción:** Genera XML factura electrónica SRI-compliant
**Input:** Dict con datos pedido completos
**Output:** String XML firmado digitalmente

### Tool 4: send_factura_email(cliente_email: str, pdf_path: str, xml_path: str) → bool
**Descripción:** Envía factura PDF + XML a cliente
**Input:** Email destino, paths archivos
**Output:** True si envío exitoso, False si error

### Tool 5: calculate_dso(facturas: list) → float
**Descripción:** Calcula Days Sales Outstanding (promedio días cobro)
**Input:** Lista facturas últimos 90 días con fecha emisión y fecha cobro
**Output:** Float DSO en días

## Knowledge Base

**customer_database.csv:**
- Columnas: RUC, Razón Social, Dirección, Email, Teléfono, Crédito Aprobado, Días Pago Promedio, Morosidad Histórica %
- Rows: ~500-2,000 clientes (depende tamaño empresa)

**inventory_master.csv:**
- Columnas: SKU, Nombre Producto, Categoría, Precio Lista, Costo, Stock Actual, Stock Mínimo, Proveedor
- Rows: ~200-5,000 productos

**pricing_rules.json:**
- Descuentos por volumen (ej. >100 unidades = 5% descuento)
- Descuentos por cliente VIP
- Promociones temporales
- Reglas validación (ej. descuento max 25% sin aprobación)

**business_rules_ecuador.md:**
- IVA: 15% (Ecuador 2024)
- Factura electrónica: Obligatoria >$200
- RUC validación: 13 dígitos, algoritmo módulo 11
- Formas pago: Efectivo, Transferencia, Cheque, Tarjeta, Crédito 30/60/90 días
- Retenciones: IVA 30%, Renta 1-2% según caso

## Output Format

### Para Pedido Normal (Auto-Approve):
```json
{
  "status": "approved",
  "pedido_id": "PED-2024-11-001",
  "factura_id": "001-001-0012345",
  "clave_acceso_sri": "1811202401179...",
  "cliente": {
    "ruc": "1790123456001",
    "razon_social": "Distribuidora XYZ S.A.",
    "email": "facturacion@xyz.com"
  },
  "items": [
    {"sku": "PROD-001", "cantidad": 50, "precio_unitario": 25.50, "subtotal": 1275.00}
  ],
  "subtotal": 1275.00,
  "iva": 191.25,
  "total": 1466.25,
  "forma_pago": "Crédito 30 días",
  "fecha_vencimiento": "2024-12-18",
  "acciones_tomadas": [
    "✅ RUC validado SRI",
    "✅ Stock verificado (150 disponibles)",
    "✅ Precio vs lista: OK",
    "✅ Factura generada y autorizada SRI",
    "✅ Email enviado a cliente",
    "✅ Recordatorio cobranza agendado -7 días"
  ],
  "evidence": {
    "tiempo_proceso": "47 segundos",
    "vs_manual": "4.2 días promedio manual",
    "ahorro_tiempo": "99%"
  }
}
```

### Para Pedido Anómalo (Human Review):
```json
{
  "status": "pending_review",
  "pedido_id": "PED-2024-11-002",
  "razón_review": "Descuento solicitado 35% excede límite 25%",
  "anomalías": [
    {
      "tipo": "descuento_alto",
      "valor": "35%",
      "límite": "25%",
      "justificación_cliente": "Cliente VIP, pedido grande",
      "recomendación": "Aprobar si volumen >$10K, rechazar si menor"
    }
  ],
  "datos_contexto": {
    "cliente": "Distribuidora ABC",
    "historial_compras_12m": "$145,000",
    "morosidad_histórica": "0%",
    "pedido_actual": "$12,500"
  },
  "siguiente_paso": "Enviar notificación Slack a @gerencia para aprobación manual"
}
```

## Error Handling

**Errores Comunes:**
1. **RUC inválido:** Solicitar corrección cliente (email automático)
2. **Stock insuficiente:** Ofrecer alternativas productos similares o backorder
3. **SRI API down:** Queue factura, reintentar cada 5 min, escalar si >30 min
4. **Email bounce:** Intentar teléfono/WhatsApp, registrar en CRM para follow-up manual

**Logging:**
Todos los errores logged en CloudWatch con:
- Timestamp
- Pedido ID
- Tipo error
- Stack trace
- Acción tomada

## Performance Targets

- **Accuracy:** >95% pedidos procesados sin error (vs. 96-98% manual con errores humanos)
- **Tiempo proceso:** <2 min pedido promedio (vs. 4.5 días manual)
- **Facturas rechazadas SRI:** <0.5% (vs. 2-3% manual)
- **Disponibilidad:** 99.5% uptime (medido mensual)

## Ecuador-Specific Considerations

1. **RUC Validation:** Usar algoritmo módulo 11 oficial SRI
2. **IVA 15%:** Actualizado desde 12% en 2024
3. **Factura Electrónica Obligatoria:** Sí para empresas >$60K facturación anual
4. **Retenciones:** Aplicar según tipo contribuyente (agente retención sí/no)
5. **Español Ecuador:** Usar "cédula" no "DNI", "guía de remisión" no "albarán"

## Continuous Improvement

**Feedback Loop:**
- Revisar semanalmente pedidos en "pending_review"
- Identificar patrones (ej. si >10 pedidos/semana mismo cliente requieren review, ajustar regla)
- Actualizar pricing_rules.json basado en decisiones gerencia
- Re-entrenar modelo NLP si accuracy extracción <90%

**A/B Testing:**
- Testear prompts alternativos para extracción datos (ej. GPT-4 vs. Claude vs. fine-tuned)
- Comparar outputs, medir accuracy, elegir mejor performer

## Security & LOPDP

- **PII Handling:** RUC, nombre cliente, dirección son datos personales → anonimizar en logs (Presidio)
- **Retention:** Facturas 7 años (regulación SRI), luego eliminar
- **Access Control:** Solo usuarios rol "Facturación" pueden ejecutar agente
- **Audit Trail:** Trazabilidad completa pedido → factura → cobro (Art. 21 LOPDP)

## Integration Points

**ERP/CRM:**
- Leer: Pedidos entrantes, inventario, clientes
- Escribir: Facturas generadas, actualizaciones stock, registros cobro

**SRI API:**
- Validación RUC: GET /ruc/{numero}
- Autorización factura: POST /factura-electronica
- Consulta clave acceso: GET /factura/{claveacceso}

**Notificaciones:**
- Slack: Pedidos anomalías requieren review
- Email: Facturas a clientes, recordatorios cobranza
- WhatsApp Business (opcional): Confirmaciones pedido, recordatorios pago

---

**Última actualización:** 2024-11-19
**Versión:** 2.0
**Autor:** Héctor Velasco, H3L
```

---

### AGENTE #2: Legal/LOPDP (Compliance)

**Objetivo:** Auditar PII, generar DPAs, responder consultas ley, mitigar riesgo multas 1% facturación

**Custom Instructions (Resumen - 1,500 palabras similar estructura):**

**Role:** Especialista LOPDP Ecuador (Ley Orgánica Protección Datos Personales)

**Responsibilities:**
1. Auditoría PII (escaneo docs, identificación datos personales)
2. Generación DPA (Data Processing Agreements Art. 41)
3. Respuesta consultas legales CEO/equipo
4. Alertas riesgo incumplimiento
5. Evidence Package compliance mensual

**Tools:**
- scan_documents_pii(folder_path) → dict
- generate_dpa_template(empresa_data) → pdf
- check_lopdp_compliance(criterios) → score_0_100
- query_superdatos_cases(keyword) → list

**Knowledge Base:**
- lopdp_ley_completa.pdf (Ley Orgánica 2021)
- lopdp_reglamento.pdf (Reglamento 2023)
- superdatos_casos_precedentes.csv (resoluciones SUPERDATOS últimos 2 años)
- dpa_templates/ (plantillas DPA sector-specific)

**Output Format:** Similar Evidence Package + recomendaciones acción

---

### AGENTE #3: BI/Reporting (Business Intelligence)

**Objetivo:** Portal CEO - responder queries ad-hoc sobre documentos internos <10s

**Custom Instructions:**

**Role:** Analista BI con RAG sobre repositorio documentos cliente

**Responsibilities:**
1. Responder queries CEO (ej. "¿Top 10 clientes por margen?", "¿Proveedores >60 días por pagar?")
2. Generar reportes automáticos (weekly revenue, monthly P&L summary)
3. Detectar anomalías (ej. "Gastos operativos +25% vs. mes anterior")
4. Citar fuentes documentos (transparency - Evidence Package principle)

**RAG Architecture:**
```
Query CEO
  ↓
Embedding (Claude embeddings)
  ↓
Qdrant Vector Search (top-k=5 docs)
  ↓
Presidio PII Anonymization
  ↓
LLM (Claude Sonnet) + Context
  ↓
Response con Citations
```

**Knowledge Base:** Repositorio cliente multi-formato
- Contratos (PDF)
- Estados financieros (Excel, PDF)
- Políticas internas (Word, PDF)
- Emails importantes (PST export)
- Reportes ERP (CSV)

**Output Format:**
```markdown
**Query:** ¿Top 10 clientes por margen últimos 6 meses?

**Respuesta:**

| Cliente | Revenue 6M | Margen % | Margen $ |
|---------|------------|----------|----------|
| ABC S.A. | $145,000 | 32% | $46,400 |
| XYZ Ltd. | $98,500 | 28% | $27,580 |
...

**Fuentes:**
- Estados financieros Q2 2024 (p. 12) - /docs/financiero/Q2_2024.pdf
- Reporte ventas detalle junio-noviembre - /reports/sales_detail_jun_nov.csv

**Confianza:** 94% (datos completos 6 meses, no proyecciones)

**Tiempo respuesta:** 4.2s
```

---

### AGENTE #4-10: Resumen

**#4 CX (Customer Experience):**
- Chatbot atención cliente (WhatsApp Business integración)
- Responder FAQs, rastrear pedidos, agendar citas

**#5 Ventas:**
- Lead scoring, email sequences, CRM auto-update

**#6 Finanzas:**
- Reconciliación bancaria, categorización gastos, proyecciones cash flow

**#7 Inventario:**
- Reorder points, predicción demanda, optimización niveles stock

**#8 Calidad:**
- Auditorías ISO, no-conformidades tracking, CAPA (Corrective Action)

**#9 Compras:**
- RFQs automáticos, comparación proveedores, PO generation

**#10 Talento:**
- Onboarding automation, performance reviews reminders, payroll checks

*(Cada uno con Custom Instructions 1,500 palabras, Tools, Knowledge Base, Output Format específicos)*

---

## 📊 EVIDENCE PACKAGES TÉCNICOS v2.0

### Concepto (Inspiración C3.ai)

**Problema:** "IA es caja negra, no confío"

**Solución H3L:** Cada recomendación agente tiene "factura" mostrando:
1. Datos analizados
2. Proceso decisión
3. Benchmark comparación
4. Confianza cálculo (%)
5. Limitaciones/riesgos

### Template Evidence Package

**Markdown Structure:**

```markdown
# Evidence Package: [Recomendación]

**Fecha:** 2024-11-19
**Agente:** Procesos_OrderToCash_Agent_v2
**Cliente:** Distribuidora XYZ

---

## 1. Recomendación

**Qué:** Automatizar facturación Order-to-Cash con Agente GPT

**Por qué:** Reducir errores 4% → 0.5%, tiempo 4.5 días → 1.5 días

**ROI proyectado:** $63,900/año

---

## 2. Datos Analizados

**Fuentes:**
- 1,200 facturas procesadas enero-junio 2025 (6 meses)
- ERP exports: pedidos, inventory, clientes
- Entrevistas: 3 FTEs equipo facturación (8h shadowing)

**Herramientas:**
- Python pandas (análisis estadístico)
- Excel (visualizaciones)
- Manual review 50 facturas sample (validación)

**Variables Medidas:**
- Tiempo proceso: inicio pedido → factura autorizada SRI
- Tasa errores: % pedidos requieren corrección manual
- Tipos errores: producto wrong (45%), precio (30%), datos cliente (15%), descuento (10%)
- Costo FTE: $20/hora × horas dedicadas facturación

---

## 3. Estado Actual (Baseline)

**Tiempo Proceso:**
- Promedio: 4.5 días
- Mediana: 4 días
- Percentil 90: 7 días
- Más lento: 12 días (caso outlier, cliente nuevo sin historial)

**Tasa Errores:**
- Total pedidos 6M: 1,200
- Pedidos con errores: 48 (4%)
- Breakdown:
  - Producto wrong enviado: 22 casos (45%)
  - Precio incorrecto facturado: 14 casos (30%)
  - Datos cliente erróneos: 7 casos (15%)
  - Descuento mal aplicado: 5 casos (10%)

**Costo Anual:**
- Errores: 48 × 2/mes × 12 × $150 (disputa + corrección) = $17,280
- Tiempo FTE: 1 persona 50% tiempo × $20/h × 2,000h = $20,000
- **TOTAL:** $37,280/año

---

## 4. Benchmark Industria

**Sector:** Comercio/Distribución Ecuador

**Empresas Comparables:** 10-50 empleados, 50-150 pedidos/mes

**Fuentes Benchmark:**
- H3L internal database (10 clientes sector auditados)
- Estudios USAID "Digitalización MIPYMES Ecuador 2023"
- Conversaciones informales CEOs (cámaras comercio)

**Métricas Best-in-Class con IA:**
- Tiempo proceso: 1-2 días
- Tasa errores: 0.2-0.5%
- Costo FTE facturación: <10% tiempo (resto en análisis valor agregado)

**Gap XYZ vs. Best-in-Class:**
- Tiempo: 4.5 días vs. 1.5 días = **3 días gap**
- Errores: 4% vs. 0.5% = **3.5% gap**

---

## 5. Solución Propuesta

**Agente:** Procesos_OrderToCash_Agent_v2

**Capabilities:**
1. Recepción pedido (email, WhatsApp, CSV) → extracción NLP
2. Validación RUC vía API SRI Ecuador
3. Verificación stock vía ERP API
4. Generación factura XML SRI-compliant
5. Envío automático email cliente
6. Seguimiento cobranza (recordatorios -7, 0, +15, +30 días)

**Integración:**
- API ERP [nombre ERP cliente]: Lectura inventario, escritura facturas
- O RPA UiPath (si ERP legacy sin API): Macros automatizadas

**Human-in-the-Loop:**
- Pedidos >$5,000: Revisión manual CEO
- Descuentos >25%: Aprobación gerencia
- Clientes nuevos sin historial: Validación crédito manual
- **Estimado:** 15% pedidos requieren human review (85% fully automated)

---

## 6. Proyección Resultados

**Supuestos:**
1. Agente accuracy 95% (validado en testing con 100 pedidos sample)
2. Implementación completa 8 semanas
3. Adopción equipo 80% primer mes, 95% mes 3
4. No cambios volumen pedidos (+/- 10% acceptable)

**Resultados Esperados:**

**Tiempo Proceso:**
- Actual: 4.5 días
- Post-IA: 1.5 días
- Reducción: 67%

**Tasa Errores:**
- Actual: 4%
- Post-IA: 0.5%
- Reducción: 87.5%

**Ahorro Errores:**
- Errores evitados/año: (48 - 6) = 42
- Ahorro: 42 × $150 = **$6,300/año**

**Ahorro Tiempo FTE:**
- Tiempo liberado: 3 días × 1,200 pedidos/año
- Horas ahorradas: 3,600 días × 8h/día = 28,800h (nota: pedidos overlap, real ~500h/año)
- Cálculo correcto: 1 FTE 50% → 10% = 40% tiempo liberado = 800h
- Valor: 800h × $20/h = **$16,000/año**

**Ahorro Total Conservador:** $6,300 + $16,000 = **$22,300/año**

*(Nota: Cifra menor que $63,900 en Calculator porque Calculator incluía también mejora cobranza DSO - aquí solo O2C proceso)*

---

## 7. Confianza Cálculo

**Score:** 87% (Alta)

**Basado en:**
- ✅ Data histórica: 6 meses suficiente para estacionalidad
- ✅ Benchmarks: 10 casos similares H3L + estudios sector
- ✅ Testing: 100 pedidos piloto con agente, 95% accuracy validada
- ⚠️ Variabilidad: ±15% dependiendo adopción equipo
- ⚠️ Supuesto volumen pedidos constante (si crece +30%, ahorro escala proporcionalmente)

**Factores Riesgo:**
- Resistencia equipo facturación (mitigación: capacitación + involucrarlos diseño)
- ERP API downtime (mitigación: RPA fallback)
- Cambios regulación SRI (mitigación: monitoring legal + updates rápidos)

---

## 8. Limitaciones / Riesgos

**Limitación #1: Accuracy No 100%**
- Agente 95% accurate → 5% pedidos requieren corrección
- Vs. humanos 96-98% (pero humanos más lentos)
- **Mitigación:** Human-in-the-Loop para casos >$5K, descuentos altos

**Limitación #2: Dependencia Internet/Cloud**
- Uptime AWS 99.5% → 0.5% tiempo no disponible
- 3.6h downtime/mes promedio
- **Mitigación:** Queue pedidos offline, procesar cuando vuelve conexión

**Limitación #3: Curva Aprendizaje Equipo**
- Semana 1-2: Equipo learning new system, posible lentitud temporal
- **Mitigación:** Capacitación 4h + manual PDF + soporte 90 días

**Riesgo #1: Cambio Regulación**
- SRI puede cambiar formato XML factura (ha pasado 2 veces últimos 5 años)
- **Mitigación:** Monitoring legal, updates agente <48h si cambio

**Riesgo #2: Data Quality**
- Si inventario ERP desactualizado (ej. stock dice 100 pero real 0), agente da info errónea
- **Mitigación:** Auditoría inventario pre-go-live, reconciliaciones mensuales

---

## 9. Timeline Implementación

**Semana 1-2:** Setup & Discovery
- Acceso ERP/APIs
- Ingesta Knowledge Base (clientes, productos, reglas)
- Testing 50 pedidos históricos

**Semana 3-4:** Piloto Controlado
- 20% pedidos vía agente, 80% manual (paralelo)
- Comparar outputs agente vs. manual
- Ajustar prompts si discrepancias

**Semana 5-6:** Rollout Gradual
- 50% pedidos vía agente
- Capacitación equipo (2 sesiones 2h c/u)
- Feedback loop activo

**Semana 7-8:** Go-Live Full
- 85% pedidos vía agente (15% human review)
- Monitoreo diario KPIs
- Support 24/7 primera semana

**Semana 9-12:** Medición & Refinamiento
- Reporte ROI mensual
- Ajustes basados en feedback
- Evidence Package final con números reales

---

## 10. Métricas Éxito (KPIs)

**Objetivo 90 Días:**

| Métrica | Baseline | Target | Actual (Mes 3) |
|---------|----------|--------|----------------|
| Tiempo proceso promedio | 4.5 días | <2 días | *TBD* |
| Tasa errores | 4% | <1% | *TBD* |
| Facturas rechazadas SRI | 2.5% | <0.5% | *TBD* |
| Adopción equipo | 0% | >80% | *TBD* |
| Ahorro acumulado | $0 | >$5,000 | *TBD* |

**Revisión Mensual:**
- Mes 1: Baseline + Piloto
- Mes 2: Rollout + Capacitación
- Mes 3: Full Production + ROI Measurement

**Contingencia:**
- Si accuracy <90% Mes 2 → Pause rollout, debug prompts
- Si adopción equipo <50% Mes 2 → Sesión troubleshooting con equipo
- Si ROI <$10K proyectado Mes 3 → Reunión CEO, plan B

---

## 11. Contacto & Soporte

**Responsable Técnico:** Héctor Velasco (h3l@h3l.ec)

**Soporte 90 Días Post-Go-Live:**
- Email/WhatsApp: <24h response
- Slack channel dedicado: Real-time
- Check-ins quincenales: 30 min call

**Escalation:**
- P0 (Crítico, downtime): <2h response
- P1 (Alto, accuracy issue): <24h
- P2 (Medio, feature request): <1 semana
- P3 (Bajo, docs/training): <2 semanas

---

**Evidence Package generado:** 2024-11-19
**Versión:** 1.0
**Próxima revisión:** Post-Mes 3 (números reales vs. proyección)
```

---

## 🛡️ BAÚL DE SEGURIDAD LOPDP-FIRST (v1.0 Mantenido - Crítico)

### 8 Capas Seguridad

**1. Cifrado Datos en Reposo**
- AES-256 (S3 buckets, Qdrant vector DB)
- Key management: AWS KMS

**2. Cifrado Datos en Tránsito**
- TLS 1.3 (API Gateway, frontend)
- Certificate pinning (mobile apps)

**3. Anonimización PII Pre-RAG**
- Presidio (Microsoft): Detecta + reemplaza PII antes indexar
- Entidades: RUC, nombres, emails, teléfonos, direcciones
- Reversible para casos necesarios (ej. facturación) con key separation

**4. MFA + RBAC (Zero-Trust)**
- Multi-Factor Authentication obligatorio (Google Authenticator)
- Role-Based Access Control:
  - Admin: Héctor (full access)
  - CEO Cliente: Portal CEO read-only
  - Equipo Cliente: Agentes específicos (ej. Facturación solo O2C agent)

**5. DPA Mandatorio Pre-Go-Live (Art. 41 LOPDP)**
- Plantilla legal revisada abogado ecuatoriano
- Firma electrónica ambas partes
- Anexos: Inventario datos, medidas seguridad, sub-procesadores (AWS)

**6. Trazabilidad Decisiones (Art. 21 LOPDP)**
- Logging completo:
  - Timestamp, user, acción, input, output, confidence score
- Retention: 2 años (luego anonymize + archive)
- Auditable por SUPERDATOS si solicitud

**7. Política Retención/Eliminación**
- Datos operativos (facturas, pedidos): 7 años (ley fiscal SRI)
- Logs sistema: 2 años
- PII no necesario: Eliminar a solicitud cliente (derecho cancelación Art. 18)

**8. Auditoría Externa Anual (Opcional Enterprise)**
- Pentest: Red team simula ataque
- LOPDP compliance audit: Abogado experto
- Report: Enviado CEO cliente + H3L + opcional SUPERDATOS (transparencia)

---

## 🚀 ROADMAP TÉCNICO 90 DÍAS

### Semana 1-2: MVP Agente Procesos

**Objetivo:** Order-to-Cash agent funcional, 95% accuracy

**Tasks:**
- [ ] Setup CrewAI + LlamaIndex
- [ ] Configurar Claude Sonnet API
- [ ] Desarrollar Custom Instructions (1,500 palabras)
- [ ] Crear Knowledge Base (customers, inventory, pricing rules)
- [ ] Implementar Tools (validate_ruc, check_inventory, etc.)
- [ ] Unit testing: 100 pedidos sample históricos
- [ ] Accuracy target: >95%

**Entregable:** Agente O2C operativo en sandbox

---

### Semana 3-4: MVP Portal CEO

**Objetivo:** RAG funcional sobre 1 repositorio docs

**Tasks:**
- [ ] Setup Qdrant vector DB
- [ ] Ingestar docs cliente (PDFs, Excel, emails) - sample 50 docs
- [ ] Implementar Presidio PII anonymization
- [ ] Desarrollar frontend chat (Vercel AI SDK + React)
- [ ] Integration testing: 50 queries test
- [ ] Response time target: <10s

**Entregable:** Portal CEO MVP funcional

---

### Semana 5-6: Cliente Piloto Onboarding

**Objetivo:** Firma 1 cliente Pro, setup tenant

**Tasks:**
- [ ] Discovery presencial (8h)
- [ ] Shadowing procesos
- [ ] Análisis data (facturas, inventario 6 meses)
- [ ] Setup tenant aislado (Qdrant namespace, S3 bucket dedicado)
- [ ] DPA firma (Art. 41 LOPDP)

**Entregable:** Cliente piloto ready para implementación

---

### Semana 7-10: Implementación Piloto

**Objetivo:** 3 agentes operativos + Portal CEO live

**Tasks:**
- [ ] Configurar 3 agentes sector-specific (O2C + LOPDP + BI)
- [ ] Ingesta Knowledge Base completo cliente
- [ ] Integración ERP vía API (o RPA si legacy)
- [ ] Capacitación equipo (2 sesiones 4h)
- [ ] Go-live producción
- [ ] Monitoreo 24/7 primeros 7 días

**Entregable:** Piloto en producción

---

### Semana 11-12: Medición ROI + Evidence Package

**Objetivo:** Números reales vs. proyección

**Tasks:**
- [ ] Comparar KPIs baseline vs. post-IA (4 semanas data)
- [ ] Calcular ahorro real acumulado
- [ ] Ajustar proyección anual si necesario
- [ ] Generar Evidence Package final (template arriba)
- [ ] CEO testimonial video (60s)
- [ ] Case study PDF (2 páginas)

**Entregable:** Case study publicable con ROI real

---

## 📊 TESTING & QA ROADMAP

### Unit Testing (Semana 1-4)

**Agente O2C:**
- 100 pedidos históricos procesados
- Comparar output agente vs. facturas reales emitidas
- Medir accuracy: % pedidos correctos
- Target: >95%

**Portal CEO:**
- 50 queries test preparadas (ej. "Top 10 clientes", "Proveedores morosos", etc.)
- Comparar respuesta agente vs. respuesta manual analista
- Medir accuracy + tiempo respuesta
- Target: >90% accuracy, <10s response

---

### Integration Testing (Semana 5-8)

**ERP API:**
- Test CRUD operations (Create factura, Read inventory, Update stock, Delete pedido)
- Validar formato datos (JSON schema compliance)
- Test error handling (API down, timeout, malformed response)

**SRI API Ecuador:**
- Test validación RUC (100 casos: válidos, inválidos, edge cases)
- Test autorización factura (XML bien formado, firmado, enviado)
- Test consulta clave acceso

---

### User Acceptance Testing (Semana 9-10)

**Equipo Cliente:**
- 5 usuarios finales prueban agentes en ambiente staging
- Feedback: ¿Fácil usar? ¿Confiable? ¿Más rápido que manual?
- Ajustes UX basados en feedback

**CEO Cliente:**
- Demo Portal CEO (10 queries live)
- Validar respuestas útiles, citaciones claras
- Aprobar go-live

---

### Performance Testing (Semana 11-12)

**Load Testing:**
- Simular 500 pedidos simultáneos (10x volumen normal)
- Medir latencia, throughput, error rate
- Escalar infra si necesario (AWS Lambda auto-scaling)

**Stress Testing:**
- ¿Qué pasa si Qdrant DB falla? (Fallback a búsqueda simple)
- ¿Qué pasa si Claude API rate-limited? (Queue requests, retry logic)

---

## 💰 READY FOR PRODUCTION CRITERIA

**Checklist Go-Live:**

- [ ] Accuracy >95% (agentes core)
- [ ] Accuracy >90% (Portal CEO RAG)
- [ ] 0 incidencias críticas últimos 7 días staging
- [ ] DPA firmado (LOPDP compliant)
- [ ] Equipo capacitado (>80% confort usando sistema)
- [ ] Backups automáticos funcionando (diarios)
- [ ] Monitoring alertas configuradas (Slack notifications)
- [ ] Runbook documentado (troubleshooting común)
- [ ] CEO cliente aprobación final

**Si algún criterio NO cumplido → Postpone go-live hasta arreglado**

---

## 📚 RECURSOS ADICIONALES

**Documentación Técnica:**
1. CrewAI Docs: https://docs.crewai.com
2. LlamaIndex Docs: https://docs.llamaindex.ai
3. Qdrant Docs: https://qdrant.tech/documentation
4. Presidio Docs: https://microsoft.github.io/presidio

**Compliance LOPDP:**
1. Ley LOPDP Ecuador: https://www.datospersonales.gob.ec/ley
2. Reglamento LOPDP: https://www.datospersonales.gob.ec/reglamento
3. SUPERDATOS Resoluciones: https://www.datospersonales.gob.ec/resoluciones

**Templates Code (GitHub H3L):**
1. Custom Instructions Agentes (Markdown)
2. Qdrant Ingestion Scripts (Python)
3. Presidio Anonymization Config (YAML)
4. Evidence Package Generator (Python + Jinja2)

---

**Documento creado:** 19 Noviembre 2025
**Versión:** 2.0 - GPTs Avanzados H3L
**Status:** Specs Técnicas Completas ✅ Listo para Desarrollo 🚀

---

*Formularios H3L v2.0 COMPLETADOS (4/4):*
1. ✅ perfil-maestro-h3l-v2.md
2. ✅ ejercicios-semana-1-h3l-v2.md
3. ✅ presencia-digital-h3l-v2.md
4. ✅ gpts-avanzados-h3l-v2.md

**Próximo paso:** Commit + Push + Landing HTML Coral/Verde
