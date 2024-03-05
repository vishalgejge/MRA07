import React from 'react';
import Layout from '../../components/layout/Layout'

const DownloadPdf = () => {
  const pdfLinks = [
    {
      title: 'Leave and Licence Agreement',
      url: 'https://firebasestorage.googleapis.com/v0/b/maharentagreement-79b07.appspot.com/o/pdfs%2Fdownload_pdfs%2Fpage_uploads_leave_and_license_agreement.pdf?alt=media&token=70341396-c787-4507-a347-794088b124ef',
    },
    {
      title: 'Authority Letter HUF',
      url: 'https://firebasestorage.googleapis.com/v0/b/maharentagreement-79b07.appspot.com/o/pdfs%2Fdownload_pdfs%2Fpage_uploads_authority_letter_huf.pdf?alt=media&token=7617c737-d7bc-4efb-b901-b09bbe5dd0f0',
    },
    {
      title: 'Authority Letter Partnership',
      url: 'https://firebasestorage.googleapis.com/v0/b/maharentagreement-79b07.appspot.com/o/pdfs%2Fdownload_pdfs%2Fpage_uploads_authority_letter_partnership.pdf?alt=media&token=0009a219-852e-4be4-a748-d6f49e117842',
    },
    {
      title: 'Authority Letter Private Ltd',
      url: 'https://firebasestorage.googleapis.com/v0/b/maharentagreement-79b07.appspot.com/o/pdfs%2Fdownload_pdfs%2Fpage_uploads_authority_letter_private_ltd.pdf?alt=media&token=d8fd66a7-c1eb-427f-839b-d52d19eb36b6',
    },
    {
      title: 'Authority Letter Proprietorship',
      url: 'https://firebasestorage.googleapis.com/v0/b/maharentagreement-79b07.appspot.com/o/pdfs%2Fdownload_pdfs%2Fpage_uploads_authority_letter_proprietorship.pdf?alt=media&token=8cf61974-736d-4768-b26e-8dc24e443795',
    },
    {
      title: 'Authority Letter Public Ltd',
      url: 'https://firebasestorage.googleapis.com/v0/b/maharentagreement-79b07.appspot.com/o/pdfs%2Fdownload_pdfs%2Fpage_uploads_authority_letter_public_ltd.pdf?alt=media&token=178b0d0b-dbce-4f42-ae95-c80797eb1fa2',
    },
    {
      title: 'Authority Letter Trustee',
      url: 'https://firebasestorage.googleapis.com/v0/b/maharentagreement-79b07.appspot.com/o/pdfs%2Fdownload_pdfs%2Fpage_uploads_authority_letter_trustee.pdf?alt=media&token=3cca2112-7861-4d38-b718-b05b5aafd78a',
    },
    {
      title: 'IGR Draft Blank',
      url: 'https://firebasestorage.googleapis.com/v0/b/maharentagreement-79b07.appspot.com/o/pdfs%2Fdownload_pdfs%2Fpage_uploads_igr_draft_blank.pdf?alt=media&token=d54ba382-058c-4d9f-84a6-1256c491f16f',
    },
    {
      title: 'POA Declaration',
      url: 'https://firebasestorage.googleapis.com/v0/b/maharentagreement-79b07.appspot.com/o/pdfs%2Fdownload_pdfs%2Fpage_uploads_poa_declaration.pdf?alt=media&token=d2d9ac05-1a61-4e09-b4bf-274eb947b9d3',
    },
    {
      title: 'Change of Name',
      url: 'https://firebasestorage.googleapis.com/v0/b/maharentagreement-79b07.appspot.com/o/pdfs%2Fdownload_pdfs%2Fpage_uploads_change_of_name.pdf?alt=media&token=22939d9c-caf2-4525-8d8e-89923044be7d',
    },
    {
      title: 'Tax Collection form PCMC',
      url: 'https://firebasestorage.googleapis.com/v0/b/maharentagreement-79b07.appspot.com/o/pdfs%2Fdownload_pdfs%2Fpage_uploads_Tax_Collection_form_PCMC.pdf?alt=media&token=e03ad75a-9b84-48ed-a20e-d91dc60c9bef',
    },
    {
      title: 'Cancellation Deed of Leave and Licence',
      url: 'https://firebasestorage.googleapis.com/v0/b/maharentagreement-79b07.appspot.com/o/pdfs%2Fdownload_pdfs%2Fcancellation_deed_of_leave_and_licence.pdf?alt=media&token=fe63ad58-993f-4a9f-8979-2b962a97eaf3',
    },
  ];


  return (
    <Layout>
      <div className=" mx-auto mt-8 py-12 p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pdfLinks.map((link, index) => (
            <div key={index} className="p-2 bg-zinc-500 rounded text-white font-semibold">
              <button
                className="w-full p-1 uppercase text-sm"
                onClick={() => window.open(link.url)}
              >
                {link.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default DownloadPdf;