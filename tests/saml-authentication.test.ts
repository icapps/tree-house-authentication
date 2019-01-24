import * as fs from 'fs';
import * as httpMocks from 'node-mocks-http';
import { createLoginRequest, createIdentityProvider, createServiceProvider, parseSAMLResponse, createLogout } from '../src/lib/saml-authentication';
import { serviceProviderConfig } from '../src/config/saml.config';

const idpMetaData = fs.readFileSync(`${__dirname}/_helpers/idp-metadata.xml`, 'utf-8');
const spMetaData = serviceProviderConfig(
  'http://10.0.190.76:3000',
  'http://10.0.190.76:3000/verify',
  { expirationDate: '2040-01-18T00:00:00Z' },
  );

const identityProvider = createIdentityProvider(idpMetaData);
const serviceProvider = createServiceProvider(spMetaData);

describe('saml-authentication', () => {
  describe('createLoginRequest', async () => {
    it('should create a login request', () => {
      const request = createLoginRequest(serviceProvider, identityProvider);

      expect(request).toContain('http://localhost:8080/simplesaml/saml2/idp/SSOService.php?SAMLRequest=');
    });

    describe('parseSAMLResponse', () => {
      // TODO: fix this test
      it('Should parse loginResponse', async () => {
        // tslint:disable-next-line:max-line-length
        const response = 'PHNhbWxwOlJlc3BvbnNlIHhtbG5zOnNhbWxwPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6cHJvdG9jb2wiIHhtbG5zOnNhbWw9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iIElEPSJfYzE4YzgxYTc1NzY1YzExZWNiZmFmY2Y4Yjk3ZDMyNTY3N2Q2M2IyZTViIiBWZXJzaW9uPSIyLjAiIElzc3VlSW5zdGFudD0iMjAxOS0wMS0yMVQwOTo1MjowM1oiIERlc3RpbmF0aW9uPSJodHRwOi8vMTAuMC4xOTAuNzY6MzAwMC92ZXJpZnkiIEluUmVzcG9uc2VUbz0iX2I5OTE1NTBiLTE3M2EtNGZkMC05NzRkLWFmMGE5ODMzNWNhNiI+PHNhbWw6SXNzdWVyPmh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9zaW1wbGVzYW1sL3NhbWwyL2lkcC9tZXRhZGF0YS5waHA8L3NhbWw6SXNzdWVyPjxkczpTaWduYXR1cmUgeG1sbnM6ZHM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyMiPgogIDxkczpTaWduZWRJbmZvPjxkczpDYW5vbmljYWxpemF0aW9uTWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94bWwtZXhjLWMxNG4jIi8+CiAgICA8ZHM6U2lnbmF0dXJlTWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI3JzYS1zaGExIi8+CiAgPGRzOlJlZmVyZW5jZSBVUkk9IiNfYzE4YzgxYTc1NzY1YzExZWNiZmFmY2Y4Yjk3ZDMyNTY3N2Q2M2IyZTViIj48ZHM6VHJhbnNmb3Jtcz48ZHM6VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI2VudmVsb3BlZC1zaWduYXR1cmUiLz48ZHM6VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94bWwtZXhjLWMxNG4jIi8+PC9kczpUcmFuc2Zvcm1zPjxkczpEaWdlc3RNZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzA5L3htbGRzaWcjc2hhMSIvPjxkczpEaWdlc3RWYWx1ZT5NR0JxS2NoRmJtRHZBb2tRdFhsL0ZmTUp3a1E9PC9kczpEaWdlc3RWYWx1ZT48L2RzOlJlZmVyZW5jZT48L2RzOlNpZ25lZEluZm8+PGRzOlNpZ25hdHVyZVZhbHVlPk9MYm1zWXFDa2N2WENxMXVnWWlqS1hWZlVLdC9DU0d2dzNPK2dRaWJCR0pkUkxhMnkvS2Jlb3RVUkNzVS9xTkhITlpDNFBhY0U4S2lENHBSYTVhdm1HSVYrZkRxS3ozTHpaWGlZUXp4blV4aHZDanhaQUUwRVhsbGpJQWNIbk1KWmtIKzMwTmdQMzdyWWV6QjVLL2pTNnJEWWo0WHMrQmhVbkg0cGFYaGJTenBwbVNoNmoxcy9qM2J3QVd0NUVlQjRFMDRJMS8yK1U4QUtOY0Z1T1hVTDM0L0lmK1FiUlY2elFIem51WDlhRlkxOFhUVmtmdUJvc0k1cjdHdDNSTy9Odzdya3F6YldKclowMmRjNnpjYlFRYjlxK0FxM1JFY2VRd2E4QUlOT0lWTkFHcTI1blpyS0xFeGFVdE1ZUXFYOFMxVGZnaXNtRk1jR1dxM1VMVWl4QT09PC9kczpTaWduYXR1cmVWYWx1ZT4KPGRzOktleUluZm8+PGRzOlg1MDlEYXRhPjxkczpYNTA5Q2VydGlmaWNhdGU+TUlJRFhUQ0NBa1dnQXdJQkFnSUpBTG1WVnVEV3U0TllNQTBHQ1NxR1NJYjNEUUVCQ3dVQU1FVXhDekFKQmdOVkJBWVRBa0ZWTVJNd0VRWURWUVFJREFwVGIyMWxMVk4wWVhSbE1TRXdId1lEVlFRS0RCaEpiblJsY201bGRDQlhhV1JuYVhSeklGQjBlU0JNZEdRd0hoY05NVFl4TWpNeE1UUXpORFEzV2hjTk5EZ3dOakkxTVRRek5EUTNXakJGTVFzd0NRWURWUVFHRXdKQlZURVRNQkVHQTFVRUNBd0tVMjl0WlMxVGRHRjBaVEVoTUI4R0ExVUVDZ3dZU1c1MFpYSnVaWFFnVjJsa1oybDBjeUJRZEhrZ1RIUmtNSUlCSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQVE4QU1JSUJDZ0tDQVFFQXpVQ0ZvemdOYjFoMU0wanpOUlNDamhPQm5SK3VWYlZwYVdmWFlJUitBaFdEZEVlNXJ5WStDZ2F2T2c4YmZMeWJ5ekZkZWhsWWREUmdrZWRFQi9Hakc4YUp3MDZsMHFGNGpET0F3MGtFeWdXQ3UybWNIN1hPeFJ0K1lBSDNUVkhhL0h1MVczV2p6a29icXFxTFE4Z2tLV1dNMjdmT2dBWjZHaWVhSkJONlZCU01NY1BleTNIV0xCbWMrVFlKbXYxZGJhTzJqSGhLaDhwZkt3MFcxMlZNOFAxUElPOGd2NFBodS91dUpZaWVCV0tpeEJFeXkwbEhqeWl4WUZDUjEyeGRoNENBNDdxOTU4WlJHbm5EVUdGVkUxUWhnUmFjSkNPWjliZDV0OW1yOEtMYVZCWVRDSm81RVJFOGp5bWFiNWRQcWU1cUtmSnNDWmlxV2dsYmpVbzl0d0lEQVFBQm8xQXdUakFkQmdOVkhRNEVGZ1FVeHB1d2NzL0NZUU95dWkrcjFHKzNLeEJOaHhrd0h3WURWUjBqQkJnd0ZvQVV4cHV3Y3MvQ1lRT3l1aStyMUcrM0t4Qk5oeGt3REFZRFZSMFRCQVV3QXdFQi96QU5CZ2txaGtpRzl3MEJBUXNGQUFPQ0FRRUFBaVdVS3MvMngvdmlOQ0tpM1k2YmxFdUN0QUdoek9PWjlFanJ2SjgrQ09IM1JhZzN0VkJXcmNCWjMvdWhoUHE1Z3k5bHF3NE9rdkV3czk5LzVqRnNYMUZKNk1LQmdxZnV5N3loNXMxWWZNMEFOSFljek1tWXBaZUFjUWYyQ0dBYVZmd1RUZlNsek5Mc0YybFcvbHk3eWFwRnpsWVNKTEdvVkUrT0hFdThnNVNsTkFDVUVma1h3KzVFZ2hoK0t6bElON1I2UTdyMml4V05GQkMvaldmN05LVWZKeVg4cUlHNW1kMVlVZVQ2R0JXOUJtMi8xL1JpTzI0SlRhWWxmTGRLSzlUWWI4c0c1QitPTGFiMkRJbUc5OUNKMjVSa0FjU29iV05GNXpEME82bGdPbzNjRWRCL2tzQ3EzaG10bEMvRGxMWi9EOENKKzdWdVpuUzFyUjJuYVE9PTwvZHM6WDUwOUNlcnRpZmljYXRlPjwvZHM6WDUwOURhdGE+PC9kczpLZXlJbmZvPjwvZHM6U2lnbmF0dXJlPjxzYW1scDpTdGF0dXM+PHNhbWxwOlN0YXR1c0NvZGUgVmFsdWU9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpzdGF0dXM6U3VjY2VzcyIvPjwvc2FtbHA6U3RhdHVzPjxzYW1sOkFzc2VydGlvbiB4bWxuczp4c2k9Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hLWluc3RhbmNlIiB4bWxuczp4cz0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEiIElEPSJfODdmZjFjMjllYzM1MjkxOWY4MjFlZjkyODAzOGFmY2ExZDA2MzNhODg5IiBWZXJzaW9uPSIyLjAiIElzc3VlSW5zdGFudD0iMjAxOS0wMS0yMVQwOTo1MjowM1oiPjxzYW1sOklzc3Vlcj5odHRwOi8vbG9jYWxob3N0OjgwODAvc2ltcGxlc2FtbC9zYW1sMi9pZHAvbWV0YWRhdGEucGhwPC9zYW1sOklzc3Vlcj48ZHM6U2lnbmF0dXJlIHhtbG5zOmRzPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzA5L3htbGRzaWcjIj4KICA8ZHM6U2lnbmVkSW5mbz48ZHM6Q2Fub25pY2FsaXphdGlvbk1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyIvPgogICAgPGRzOlNpZ25hdHVyZU1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNyc2Etc2hhMSIvPgogIDxkczpSZWZlcmVuY2UgVVJJPSIjXzg3ZmYxYzI5ZWMzNTI5MTlmODIxZWY5MjgwMzhhZmNhMWQwNjMzYTg4OSI+PGRzOlRyYW5zZm9ybXM+PGRzOlRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNlbnZlbG9wZWQtc2lnbmF0dXJlIi8+PGRzOlRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyIvPjwvZHM6VHJhbnNmb3Jtcz48ZHM6RGlnZXN0TWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI3NoYTEiLz48ZHM6RGlnZXN0VmFsdWU+ZHRaaC9CNUljU0hGUGpHcGFJUlIvdmhrZ0pVPTwvZHM6RGlnZXN0VmFsdWU+PC9kczpSZWZlcmVuY2U+PC9kczpTaWduZWRJbmZvPjxkczpTaWduYXR1cmVWYWx1ZT5YcSs1bk1lTmlsbEpRQmN4VERGVlJiT0tVT0VMWnlzalFUR2Q4dFZvaHdQYUJGMExXV01EdHdjQUlmUVljSDFYdmJCekp5VTFFWmJoUGo2VS95WkdXb0FrSGRPc3NTZU84NXVHS0lxeWIrOENoMVJUNzRaZEVuT2VvajNMUDc0K3RJTnMrYmZ3SHFwcVdsVkIrQ2JLZjY0eWNLNk9sY3F3b2JpaTZyM1lhR28vTGtkUVlXNzE1MVRDdzdQcUkzN1ZLV21zS25RYmlTeDQ2RUhvRVlySlhMUE1meEhRS1RBcG1OTnNNcVhtZkRQUnJ5K0JvZDM4VW5lOUc0ZUZDcVQxeHVxcnR3NURINGFrb3VMd0hJNHhjblRqaC9lbGIzWS93bi9HcHNiYjVxQzQyeW84QTBpU1ViNnd0ME9TZmhXcHNXbGxqbjRxRnU0MlRaTnFRSS84cUE9PTwvZHM6U2lnbmF0dXJlVmFsdWU+CjxkczpLZXlJbmZvPjxkczpYNTA5RGF0YT48ZHM6WDUwOUNlcnRpZmljYXRlPk1JSURYVENDQWtXZ0F3SUJBZ0lKQUxtVlZ1RFd1NE5ZTUEwR0NTcUdTSWIzRFFFQkN3VUFNRVV4Q3pBSkJnTlZCQVlUQWtGVk1STXdFUVlEVlFRSURBcFRiMjFsTFZOMFlYUmxNU0V3SHdZRFZRUUtEQmhKYm5SbGNtNWxkQ0JYYVdSbmFYUnpJRkIwZVNCTWRHUXdIaGNOTVRZeE1qTXhNVFF6TkRRM1doY05ORGd3TmpJMU1UUXpORFEzV2pCRk1Rc3dDUVlEVlFRR0V3SkJWVEVUTUJFR0ExVUVDQXdLVTI5dFpTMVRkR0YwWlRFaE1COEdBMVVFQ2d3WVNXNTBaWEp1WlhRZ1YybGtaMmwwY3lCUWRIa2dUSFJrTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUF6VUNGb3pnTmIxaDFNMGp6TlJTQ2poT0JuUit1VmJWcGFXZlhZSVIrQWhXRGRFZTVyeVkrQ2dhdk9nOGJmTHlieXpGZGVobFlkRFJna2VkRUIvR2pHOGFKdzA2bDBxRjRqRE9BdzBrRXlnV0N1Mm1jSDdYT3hSdCtZQUgzVFZIYS9IdTFXM1dqemtvYnFxcUxROGdrS1dXTTI3Zk9nQVo2R2llYUpCTjZWQlNNTWNQZXkzSFdMQm1jK1RZSm12MWRiYU8yakhoS2g4cGZLdzBXMTJWTThQMVBJTzhndjRQaHUvdXVKWWllQldLaXhCRXl5MGxIanlpeFlGQ1IxMnhkaDRDQTQ3cTk1OFpSR25uRFVHRlZFMVFoZ1JhY0pDT1o5YmQ1dDltcjhLTGFWQllUQ0pvNUVSRThqeW1hYjVkUHFlNXFLZkpzQ1ppcVdnbGJqVW85dHdJREFRQUJvMUF3VGpBZEJnTlZIUTRFRmdRVXhwdXdjcy9DWVFPeXVpK3IxRyszS3hCTmh4a3dId1lEVlIwakJCZ3dGb0FVeHB1d2NzL0NZUU95dWkrcjFHKzNLeEJOaHhrd0RBWURWUjBUQkFVd0F3RUIvekFOQmdrcWhraUc5dzBCQVFzRkFBT0NBUUVBQWlXVUtzLzJ4L3ZpTkNLaTNZNmJsRXVDdEFHaHpPT1o5RWpydko4K0NPSDNSYWczdFZCV3JjQlozL3VoaFBxNWd5OWxxdzRPa3ZFd3M5OS81akZzWDFGSjZNS0JncWZ1eTd5aDVzMVlmTTBBTkhZY3pNbVlwWmVBY1FmMkNHQWFWZndUVGZTbHpOTHNGMmxXL2x5N3lhcEZ6bFlTSkxHb1ZFK09IRXU4ZzVTbE5BQ1VFZmtYdys1RWdoaCtLemxJTjdSNlE3cjJpeFdORkJDL2pXZjdOS1VmSnlYOHFJRzVtZDFZVWVUNkdCVzlCbTIvMS9SaU8yNEpUYVlsZkxkS0s5VFliOHNHNUIrT0xhYjJESW1HOTlDSjI1UmtBY1NvYldORjV6RDBPNmxnT28zY0VkQi9rc0NxM2htdGxDL0RsTFovRDhDSis3VnVablMxclIybmFRPT08L2RzOlg1MDlDZXJ0aWZpY2F0ZT48L2RzOlg1MDlEYXRhPjwvZHM6S2V5SW5mbz48L2RzOlNpZ25hdHVyZT48c2FtbDpTdWJqZWN0PjxzYW1sOk5hbWVJRCBTUE5hbWVRdWFsaWZpZXI9Imh0dHA6Ly8xMC4wLjE5MC43NjozMDAwIiBGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpuYW1laWQtZm9ybWF0OnRyYW5zaWVudCI+XzBiOTU4NzEyN2Q0ZWQxMGY2NzdhODI2YzVmNGNjYjlmZmNiYzYzMTRlNTwvc2FtbDpOYW1lSUQ+PHNhbWw6U3ViamVjdENvbmZpcm1hdGlvbiBNZXRob2Q9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpjbTpiZWFyZXIiPjxzYW1sOlN1YmplY3RDb25maXJtYXRpb25EYXRhIE5vdE9uT3JBZnRlcj0iMjAxOS0wMS0yMVQwOTo1NzowM1oiIFJlY2lwaWVudD0iaHR0cDovLzEwLjAuMTkwLjc2OjMwMDAvdmVyaWZ5IiBJblJlc3BvbnNlVG89Il9iOTkxNTUwYi0xNzNhLTRmZDAtOTc0ZC1hZjBhOTgzMzVjYTYiLz48L3NhbWw6U3ViamVjdENvbmZpcm1hdGlvbj48L3NhbWw6U3ViamVjdD48c2FtbDpDb25kaXRpb25zIE5vdEJlZm9yZT0iMjAxOS0wMS0yMVQwOTo1MTozM1oiIE5vdE9uT3JBZnRlcj0iMjAxOS0wMS0yMVQwOTo1NzowM1oiPjxzYW1sOkF1ZGllbmNlUmVzdHJpY3Rpb24+PHNhbWw6QXVkaWVuY2U+aHR0cDovLzEwLjAuMTkwLjc2OjMwMDA8L3NhbWw6QXVkaWVuY2U+PC9zYW1sOkF1ZGllbmNlUmVzdHJpY3Rpb24+PC9zYW1sOkNvbmRpdGlvbnM+PHNhbWw6QXV0aG5TdGF0ZW1lbnQgQXV0aG5JbnN0YW50PSIyMDE5LTAxLTIxVDA5OjI3OjE0WiIgU2Vzc2lvbk5vdE9uT3JBZnRlcj0iMjAxOS0wMS0yMVQxNzoyNzoxNFoiIFNlc3Npb25JbmRleD0iXzMzOTIzOGQzNmI1OWI1NzQ2YTg0MzUxYzg1N2M3ZDUyYjBmYTY5YThmOCI+PHNhbWw6QXV0aG5Db250ZXh0PjxzYW1sOkF1dGhuQ29udGV4dENsYXNzUmVmPnVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphYzpjbGFzc2VzOlBhc3N3b3JkPC9zYW1sOkF1dGhuQ29udGV4dENsYXNzUmVmPjwvc2FtbDpBdXRobkNvbnRleHQ+PC9zYW1sOkF1dGhuU3RhdGVtZW50PjxzYW1sOkF0dHJpYnV0ZVN0YXRlbWVudD48c2FtbDpBdHRyaWJ1dGUgTmFtZT0idWlkIiBOYW1lRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXR0cm5hbWUtZm9ybWF0OmJhc2ljIj48c2FtbDpBdHRyaWJ1dGVWYWx1ZSB4c2k6dHlwZT0ieHM6c3RyaW5nIj4xPC9zYW1sOkF0dHJpYnV0ZVZhbHVlPjwvc2FtbDpBdHRyaWJ1dGU+PHNhbWw6QXR0cmlidXRlIE5hbWU9ImVkdVBlcnNvbkFmZmlsaWF0aW9uIiBOYW1lRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXR0cm5hbWUtZm9ybWF0OmJhc2ljIj48c2FtbDpBdHRyaWJ1dGVWYWx1ZSB4c2k6dHlwZT0ieHM6c3RyaW5nIj5ncm91cDE8L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48c2FtbDpBdHRyaWJ1dGUgTmFtZT0iZW1haWwiIE5hbWVGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphdHRybmFtZS1mb3JtYXQ6YmFzaWMiPjxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhzaTp0eXBlPSJ4czpzdHJpbmciPnVzZXIxQGV4YW1wbGUuY29tPC9zYW1sOkF0dHJpYnV0ZVZhbHVlPjwvc2FtbDpBdHRyaWJ1dGU+PHNhbWw6QXR0cmlidXRlIE5hbWU9InByZWZlcnJlZExhbmd1YWdlIiBOYW1lRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXR0cm5hbWUtZm9ybWF0OmJhc2ljIj48c2FtbDpBdHRyaWJ1dGVWYWx1ZSB4c2k6dHlwZT0ieHM6c3RyaW5nIj5lbjwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT48L3NhbWw6QXR0cmlidXRlPjwvc2FtbDpBdHRyaWJ1dGVTdGF0ZW1lbnQ+PC9zYW1sOkFzc2VydGlvbj48L3NhbWxwOlJlc3BvbnNlPg==';
        const expected = {
          uid: 1, eduPersonAffiliation: 'group1', email: 'user1@example.com', preferredLanguage: 'en',
        };
        const request = httpMocks.createRequest({
          method: 'POST',
          body: {
            SAMLResponse: response,
          },
        });

        serviceProvider.parseLoginResponse = jest.fn().mockReturnValueOnce(expected);

        const parsed =  await parseSAMLResponse(serviceProvider, identityProvider, request);
        expect(parsed).toEqual(expected);
      });
    });

    describe('createLogout', () => {
      it('Should create a valid logout URL', async () => {
        const logout = await createLogout(serviceProvider, identityProvider, '', 'https://www.icapps.com');

        expect(logout.context).toContain('http://localhost:8080/simplesaml/saml2/idp/SingleLogoutService.php?SAMLRequest=');
        expect(logout.context).toContain('RelayState=https%3A%2F%2Fwww.icapps.com');
      });
    });
  });
});
