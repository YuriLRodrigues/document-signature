type getTotalAdminDocumentsSignedResponse = {
  signedDocuments: number
  totalDocuments: number
}

export const getTotalAdminSignedDocuments = async (): Promise<getTotalAdminDocumentsSignedResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/total-signed`, {
    method: 'GET',
    cache: 'force-cache',
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()

  return {
    signedDocuments: data.signedDocuments,
    totalDocuments: data.totalDocuments,
  }
}
