'use client'
import { useState } from 'react'
import { MobileSite } from './MobileSite'
import { SchoolFormModal } from '@/components/shared/SchoolFormModal'
import { PartnerFormModal } from '@/components/shared/PartnerFormModal'
import { Toast } from '@/components/shared/Toast'

export function MobilePageClient() {
  const [schoolFormOpen, setSchoolFormOpen] = useState(false)
  const [partnerFormOpen, setPartnerFormOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 5000)
  }

  return (
    <>
      <MobileSite
        onSchoolFormOpen={() => setSchoolFormOpen(true)}
        onPartnerFormOpen={() => setPartnerFormOpen(true)}
      />
      {schoolFormOpen && (
        <SchoolFormModal
          onClose={() => setSchoolFormOpen(false)}
          onSuccess={() => { setSchoolFormOpen(false); showToast("Thank you — we'll be in touch soon.") }}
          formConfig={null}
        />
      )}
      {partnerFormOpen && (
        <PartnerFormModal
          onClose={() => setPartnerFormOpen(false)}
          onSuccess={() => { setPartnerFormOpen(false); showToast("Thank you — we'll be in touch soon.") }}
          formConfig={null}
        />
      )}
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </>
  )
}
