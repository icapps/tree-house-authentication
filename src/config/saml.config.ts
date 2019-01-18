export const serviceProviderConfig = (entityID: string, verifyLocationUrl: string, options: ServiceProviderOptions = {}) => {
  return `<?xml version="1.0"?>
    <md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata"
                     validUntil="${options.expirationDate || '2022-01-18T00:00:00Z'}"
                     cacheDuration="PT604800S"
                     entityID="${entityID}">
    <md:SPSSODescriptor AuthnRequestsSigned="false" WantAssertionsSigned="false" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
        <md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified</md:NameIDFormat>
        <md:AssertionConsumerService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"
                                     Location="${verifyLocationUrl}"
                                     index="1" />
    </md:SPSSODescriptor>
  </md:EntityDescriptor>
`;
};

// Interfaces
export interface ServiceProviderOptions {
  expirationDate?: string;
}
