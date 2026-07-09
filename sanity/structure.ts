import type { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('WeThink Bharat')
    .items([
      // ── Global ──────────────────────────────────────────────────────────
      S.listItem()
        .title('Site Settings')
        .icon(() => '⚙️')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.divider(),

      // ── Home ─────────────────────────────────────────────────────────────
      S.listItem()
        .title('Home')
        .icon(() => '🏠')
        .child(
          S.list()
            .title('Home')
            .items([
              S.listItem()
                .title('Hero')
                .child(S.document().schemaType('hero').documentId('hero')),
              S.listItem()
                .title('Who It\'s For (Pathways)')
                .child(
                  S.list().title('Pathways').items([
                    S.listItem()
                      .title('Section Intro')
                      .child(S.document().schemaType('pathwaysIntro').documentId('pathwaysIntro')),
                    S.documentTypeListItem('pathway').title('Pathway Cards'),
                  ])
                ),
              S.listItem()
                .title('The Gap (Stats)')
                .child(S.document().schemaType('gapSection').documentId('gapSection')),
            ]),
        ),

      // ── Vision ───────────────────────────────────────────────────────────
      S.listItem()
        .title('Vision')
        .icon(() => '👁️')
        .child(
          S.list()
            .title('Vision')
            .items([
              S.listItem()
                .title('Vision Content')
                .child(S.document().schemaType('visionSection').documentId('visionSection')),
              S.listItem()
                .title('What We Believe')
                .child(
                  S.list().title('Beliefs').items([
                    S.listItem()
                      .title('Section Intro')
                      .child(S.document().schemaType('beliefsIntro').documentId('beliefsIntro')),
                    S.documentTypeListItem('belief').title('Belief Statements'),
                  ])
                ),
            ]),
        ),

      // ── Domains ──────────────────────────────────────────────────────────
      S.listItem()
        .title('Domains')
        .icon(() => '🌐')
        .child(
          S.list()
            .title('Domains')
            .items([
              S.listItem()
                .title('Section Intro')
                .child(S.document().schemaType('domainsIntro').documentId('domainsIntro')),
              S.documentTypeListItem('domain').title('Domain Documents'),
            ]),
        ),

      // ── Ecosystem ─────────────────────────────────────────────────────────
      S.listItem()
        .title('Ecosystem')
        .icon(() => '🤝')
        .child(
          S.list()
            .title('Ecosystem')
            .items([
              S.listItem()
                .title('Section Intro')
                .child(S.document().schemaType('ecosystemIntro').documentId('ecosystemIntro')),
              S.documentTypeListItem('partnerCategory').title('Partner Categories'),
              S.documentTypeListItem('currentPartner').title('Partners'),
            ]),
        ),

      // ── Advisory Board ───────────────────────────────────────────────────
      S.listItem()
        .title('Advisory Board')
        .icon(() => '🎓')
        .child(
          S.list()
            .title('Advisory Board')
            .items([
              S.listItem()
                .title('Section Intro')
                .child(S.document().schemaType('advisoryIntro').documentId('advisoryIntro')),
              S.documentTypeListItem('advisoryMember').title('Members'),
            ]),
        ),

      // ── Journey ──────────────────────────────────────────────────────────
      S.listItem()
        .title('Journey')
        .icon(() => '🗺️')
        .child(
          S.list()
            .title('Journey')
            .items([
              S.listItem()
                .title('Section Intro')
                .child(S.document().schemaType('journeyIntro').documentId('journeyIntro')),
              S.documentTypeListItem('journeyStage').title('Stages'),
            ]),
        ),

      // ── Summit ────────────────────────────────────────────────────────────
      S.listItem()
        .title('Summit')
        .icon(() => '🏆')
        .child(S.document().schemaType('summit').documentId('summit')),

      // ── Contact / Apply CTA ───────────────────────────────────────────────
      S.listItem()
        .title('Contact / Apply CTA')
        .icon(() => '📣')
        .child(S.document().schemaType('applyCta').documentId('applyCta')),

      S.divider(),

      // ── Form Configs ──────────────────────────────────────────────────────
      S.listItem()
        .title('Form Settings')
        .icon(() => '📋')
        .child(
          S.list()
            .title('Form Settings')
            .items([
              S.listItem()
                .title('School Form')
                .child(S.document().schemaType('schoolFormConfig').documentId('schoolFormConfig')),
              S.listItem()
                .title('Partner Form')
                .child(S.document().schemaType('partnerFormConfig').documentId('partnerFormConfig')),
            ]),
        ),

      S.divider(),

      // ── Leads ─────────────────────────────────────────────────────────────
      S.documentTypeListItem('enquiry').title('Enquiries').icon(() => '📥'),
    ])
