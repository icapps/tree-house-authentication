import * as fs from 'fs';
import { createLoginRequest, createIdentityProvider, createServiceProvider, parseSAMLResponse } from '../src/lib/saml-authentication';
import { serviceProviderConfig } from '../src/config/saml.config';

const idpMetaData = fs.readFileSync(`${__dirname}/_helpers/idp-metadata.xml`, 'utf-8');
const spMetaData = serviceProviderConfig(
  'http://10.0.190.77:3000',
  'http://10.0.190.77:3000/verify',
  { expirationDate: '2040-01-18T00:00:00Z' },
  );

const identityProvider = createIdentityProvider(idpMetaData);
const serviceProvider = createServiceProvider(spMetaData);

describe('saml-authentication', () => {
  describe('createLoginRequest', async () => {

    it('should create a login request', () => {

      const request = createLoginRequest(serviceProvider, identityProvider);
      console.log(request);
    });

    describe('parseSAMLResponse', () => {
      it('Should parse loginResponse', async () => {
        // tslint:disable-next-line:max-line-length
        // const response = 'PHNhbWxwOlJlc3BvbnNlIHhtbG5zOnNhbWxwPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6cHJvdG9jb2wiIHhtbG5zOnNhbWw9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iIElEPSJfNzg2YjM0YzNhOWI4NGFmYjhhZmJlYmE3MjM5OTVhZTkxOTM5Mzk3OTllIiBWZXJzaW9uPSIyLjAiIElzc3VlSW5zdGFudD0iMjAxOS0wMS0xN1QxMDozNzozN1oiIERlc3RpbmF0aW9uPSJodHRwOi8vMTAuMC4xOTAuNzc6MzAwMC92ZXJpZnkiIEluUmVzcG9uc2VUbz0iXzc0NjZjNzZlLTQwYzQtNDk5NS1hZjhiLTBmMmUxOTJiNjM0NCI+PHNhbWw6SXNzdWVyPmh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9zaW1wbGVzYW1sL3NhbWwyL2lkcC9tZXRhZGF0YS5waHA8L3NhbWw6SXNzdWVyPjxkczpTaWduYXR1cmUgeG1sbnM6ZHM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyMiPgogIDxkczpTaWduZWRJbmZvPjxkczpDYW5vbmljYWxpemF0aW9uTWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94bWwtZXhjLWMxNG4jIi8+CiAgICA8ZHM6U2lnbmF0dXJlTWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI3JzYS1zaGExIi8+CiAgPGRzOlJlZmVyZW5jZSBVUkk9IiNfNzg2YjM0YzNhOWI4NGFmYjhhZmJlYmE3MjM5OTVhZTkxOTM5Mzk3OTllIj48ZHM6VHJhbnNmb3Jtcz48ZHM6VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI2VudmVsb3BlZC1zaWduYXR1cmUiLz48ZHM6VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94bWwtZXhjLWMxNG4jIi8+PC9kczpUcmFuc2Zvcm1zPjxkczpEaWdlc3RNZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzA5L3htbGRzaWcjc2hhMSIvPjxkczpEaWdlc3RWYWx1ZT5FWlhVU1pGalNZNk5wVUxQa1FZTHV6eitIV3c9PC9kczpEaWdlc3RWYWx1ZT48L2RzOlJlZmVyZW5jZT48L2RzOlNpZ25lZEluZm8+PGRzOlNpZ25hdHVyZVZhbHVlPm5TTUg0SWxmM3ZpbE9QUjc2aFphYlRnQlBHRjB2RWdGTzV1T3VvYTZxNHhtVkNJMnQyOWhkQUVXaWpkbEl2YVNHNXNKajZmVlYwMVVzU1cxK0NaTFk3anJDY1gwd3dTV0oxM21uekYxZFovN0ZlMm8ySDBiZXFXbWM1czlLMDNMc01RandVVGRObWNiS0w1cyt2TXVzN0pnMjgxUUVlRFI5dUZVTWdGS2VyZEFIQkYzdFo5NWZselFBOGhaR0F3ZEtJajdsU0hNam5IVnNUcU1acnFPN2dMcmhFNlNVRHNsSjNrYzVoS0cwMVQxSDVaN1lrZzNKOTliRSsydGtUcDd0aC96TzlwWG1yZk9aZm9lK0VDNXRCNy90cEp6WExNTnJTcnBONmltazlBQVNsSTlWdEpOQ3NLeEU5VytsaFZJYXdqa3kzWlhpUTI3ZW9lZlZnM3ZJZz09PC9kczpTaWduYXR1cmVWYWx1ZT4KPGRzOktleUluZm8+PGRzOlg1MDlEYXRhPjxkczpYNTA5Q2VydGlmaWNhdGU+TUlJRFhUQ0NBa1dnQXdJQkFnSUpBTG1WVnVEV3U0TllNQTBHQ1NxR1NJYjNEUUVCQ3dVQU1FVXhDekFKQmdOVkJBWVRBa0ZWTVJNd0VRWURWUVFJREFwVGIyMWxMVk4wWVhSbE1TRXdId1lEVlFRS0RCaEpiblJsY201bGRDQlhhV1JuYVhSeklGQjBlU0JNZEdRd0hoY05NVFl4TWpNeE1UUXpORFEzV2hjTk5EZ3dOakkxTVRRek5EUTNXakJGTVFzd0NRWURWUVFHRXdKQlZURVRNQkVHQTFVRUNBd0tVMjl0WlMxVGRHRjBaVEVoTUI4R0ExVUVDZ3dZU1c1MFpYSnVaWFFnVjJsa1oybDBjeUJRZEhrZ1RIUmtNSUlCSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQVE4QU1JSUJDZ0tDQVFFQXpVQ0ZvemdOYjFoMU0wanpOUlNDamhPQm5SK3VWYlZwYVdmWFlJUitBaFdEZEVlNXJ5WStDZ2F2T2c4YmZMeWJ5ekZkZWhsWWREUmdrZWRFQi9Hakc4YUp3MDZsMHFGNGpET0F3MGtFeWdXQ3UybWNIN1hPeFJ0K1lBSDNUVkhhL0h1MVczV2p6a29icXFxTFE4Z2tLV1dNMjdmT2dBWjZHaWVhSkJONlZCU01NY1BleTNIV0xCbWMrVFlKbXYxZGJhTzJqSGhLaDhwZkt3MFcxMlZNOFAxUElPOGd2NFBodS91dUpZaWVCV0tpeEJFeXkwbEhqeWl4WUZDUjEyeGRoNENBNDdxOTU4WlJHbm5EVUdGVkUxUWhnUmFjSkNPWjliZDV0OW1yOEtMYVZCWVRDSm81RVJFOGp5bWFiNWRQcWU1cUtmSnNDWmlxV2dsYmpVbzl0d0lEQVFBQm8xQXdUakFkQmdOVkhRNEVGZ1FVeHB1d2NzL0NZUU95dWkrcjFHKzNLeEJOaHhrd0h3WURWUjBqQkJnd0ZvQVV4cHV3Y3MvQ1lRT3l1aStyMUcrM0t4Qk5oeGt3REFZRFZSMFRCQVV3QXdFQi96QU5CZ2txaGtpRzl3MEJBUXNGQUFPQ0FRRUFBaVdVS3MvMngvdmlOQ0tpM1k2YmxFdUN0QUdoek9PWjlFanJ2SjgrQ09IM1JhZzN0VkJXcmNCWjMvdWhoUHE1Z3k5bHF3NE9rdkV3czk5LzVqRnNYMUZKNk1LQmdxZnV5N3loNXMxWWZNMEFOSFljek1tWXBaZUFjUWYyQ0dBYVZmd1RUZlNsek5Mc0YybFcvbHk3eWFwRnpsWVNKTEdvVkUrT0hFdThnNVNsTkFDVUVma1h3KzVFZ2hoK0t6bElON1I2UTdyMml4V05GQkMvaldmN05LVWZKeVg4cUlHNW1kMVlVZVQ2R0JXOUJtMi8xL1JpTzI0SlRhWWxmTGRLSzlUWWI4c0c1QitPTGFiMkRJbUc5OUNKMjVSa0FjU29iV05GNXpEME82bGdPbzNjRWRCL2tzQ3EzaG10bEMvRGxMWi9EOENKKzdWdVpuUzFyUjJuYVE9PTwvZHM6WDUwOUNlcnRpZmljYXRlPjwvZHM6WDUwOURhdGE+PC9kczpLZXlJbmZvPjwvZHM6U2lnbmF0dXJlPjxzYW1scDpTdGF0dXM+PHNhbWxwOlN0YXR1c0NvZGUgVmFsdWU9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpzdGF0dXM6U3VjY2VzcyIvPjwvc2FtbHA6U3RhdHVzPjxzYW1sOkFzc2VydGlvbiB4bWxuczp4c2k9Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hLWluc3RhbmNlIiB4bWxuczp4cz0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEiIElEPSJfM2Y4OWE2ZTcxZWVkZThkN2Q2OWFjOWQyNmM2MDAyMGNjYTMzMjAyYWNkIiBWZXJzaW9uPSIyLjAiIElzc3VlSW5zdGFudD0iMjAxOS0wMS0xN1QxMDozNzozN1oiPjxzYW1sOklzc3Vlcj5odHRwOi8vbG9jYWxob3N0OjgwODAvc2ltcGxlc2FtbC9zYW1sMi9pZHAvbWV0YWRhdGEucGhwPC9zYW1sOklzc3Vlcj48ZHM6U2lnbmF0dXJlIHhtbG5zOmRzPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzA5L3htbGRzaWcjIj4KICA8ZHM6U2lnbmVkSW5mbz48ZHM6Q2Fub25pY2FsaXphdGlvbk1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyIvPgogICAgPGRzOlNpZ25hdHVyZU1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNyc2Etc2hhMSIvPgogIDxkczpSZWZlcmVuY2UgVVJJPSIjXzNmODlhNmU3MWVlZGU4ZDdkNjlhYzlkMjZjNjAwMjBjY2EzMzIwMmFjZCI+PGRzOlRyYW5zZm9ybXM+PGRzOlRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNlbnZlbG9wZWQtc2lnbmF0dXJlIi8+PGRzOlRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyIvPjwvZHM6VHJhbnNmb3Jtcz48ZHM6RGlnZXN0TWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI3NoYTEiLz48ZHM6RGlnZXN0VmFsdWU+VjA5TUlibFhycnlzclBvVEJKWlhMN1MyQjFZPTwvZHM6RGlnZXN0VmFsdWU+PC9kczpSZWZlcmVuY2U+PC9kczpTaWduZWRJbmZvPjxkczpTaWduYXR1cmVWYWx1ZT5MVTFuOGhxVVBPRDVRRFBld2t4WTVvQXZFRFoyRm5LWGJWaS9zVmxCaWNOWEVuMngxaGRtMnp3eTFJUHpOa1hWMXUyYXgzQmtSSHEwSzBZZzhlaWMva3plYzBnbHN5T3FRK0JXRk95a3JPNzU3bjRjOGRKOHpZRGNtRHQ4MHFKRHQ3c0V6MkNVOFlnK3phd2REV0dnTGV4a3BOUjRURG5xRlRFU04vTTBpZDRlWDZwYUg3VENrMGZIcm1TM2ZQVy8wZXAza3pTSFgvWnJ6cDNRUWM5anZ6V1lNWjYwUzRoZUNqc3pSeENBQmpVRUhLTUw5cGtkVHR5TXhUekxQTERZM1dqQ1g0eWk1dDdmUDAzbitUNUpNREpnK25HbnRjRG9ZVTlKUUg1cFhWOTFxVFkxQkR5NTVuUU1ZQXVMLzFYbmh0bDdCUUxnTW5ZbW1Hc21LVy9hdkE9PTwvZHM6U2lnbmF0dXJlVmFsdWU+CjxkczpLZXlJbmZvPjxkczpYNTA5RGF0YT48ZHM6WDUwOUNlcnRpZmljYXRlPk1JSURYVENDQWtXZ0F3SUJBZ0lKQUxtVlZ1RFd1NE5ZTUEwR0NTcUdTSWIzRFFFQkN3VUFNRVV4Q3pBSkJnTlZCQVlUQWtGVk1STXdFUVlEVlFRSURBcFRiMjFsTFZOMFlYUmxNU0V3SHdZRFZRUUtEQmhKYm5SbGNtNWxkQ0JYYVdSbmFYUnpJRkIwZVNCTWRHUXdIaGNOTVRZeE1qTXhNVFF6TkRRM1doY05ORGd3TmpJMU1UUXpORFEzV2pCRk1Rc3dDUVlEVlFRR0V3SkJWVEVUTUJFR0ExVUVDQXdLVTI5dFpTMVRkR0YwWlRFaE1COEdBMVVFQ2d3WVNXNTBaWEp1WlhRZ1YybGtaMmwwY3lCUWRIa2dUSFJrTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUF6VUNGb3pnTmIxaDFNMGp6TlJTQ2poT0JuUit1VmJWcGFXZlhZSVIrQWhXRGRFZTVyeVkrQ2dhdk9nOGJmTHlieXpGZGVobFlkRFJna2VkRUIvR2pHOGFKdzA2bDBxRjRqRE9BdzBrRXlnV0N1Mm1jSDdYT3hSdCtZQUgzVFZIYS9IdTFXM1dqemtvYnFxcUxROGdrS1dXTTI3Zk9nQVo2R2llYUpCTjZWQlNNTWNQZXkzSFdMQm1jK1RZSm12MWRiYU8yakhoS2g4cGZLdzBXMTJWTThQMVBJTzhndjRQaHUvdXVKWWllQldLaXhCRXl5MGxIanlpeFlGQ1IxMnhkaDRDQTQ3cTk1OFpSR25uRFVHRlZFMVFoZ1JhY0pDT1o5YmQ1dDltcjhLTGFWQllUQ0pvNUVSRThqeW1hYjVkUHFlNXFLZkpzQ1ppcVdnbGJqVW85dHdJREFRQUJvMUF3VGpBZEJnTlZIUTRFRmdRVXhwdXdjcy9DWVFPeXVpK3IxRyszS3hCTmh4a3dId1lEVlIwakJCZ3dGb0FVeHB1d2NzL0NZUU95dWkrcjFHKzNLeEJOaHhrd0RBWURWUjBUQkFVd0F3RUIvekFOQmdrcWhraUc5dzBCQVFzRkFBT0NBUUVBQWlXVUtzLzJ4L3ZpTkNLaTNZNmJsRXVDdEFHaHpPT1o5RWpydko4K0NPSDNSYWczdFZCV3JjQlozL3VoaFBxNWd5OWxxdzRPa3ZFd3M5OS81akZzWDFGSjZNS0JncWZ1eTd5aDVzMVlmTTBBTkhZY3pNbVlwWmVBY1FmMkNHQWFWZndUVGZTbHpOTHNGMmxXL2x5N3lhcEZ6bFlTSkxHb1ZFK09IRXU4ZzVTbE5BQ1VFZmtYdys1RWdoaCtLemxJTjdSNlE3cjJpeFdORkJDL2pXZjdOS1VmSnlYOHFJRzVtZDFZVWVUNkdCVzlCbTIvMS9SaU8yNEpUYVlsZkxkS0s5VFliOHNHNUIrT0xhYjJESW1HOTlDSjI1UmtBY1NvYldORjV6RDBPNmxnT28zY0VkQi9rc0NxM2htdGxDL0RsTFovRDhDSis3VnVablMxclIybmFRPT08L2RzOlg1MDlDZXJ0aWZpY2F0ZT48L2RzOlg1MDlEYXRhPjwvZHM6S2V5SW5mbz48L2RzOlNpZ25hdHVyZT48c2FtbDpTdWJqZWN0PjxzYW1sOk5hbWVJRCBTUE5hbWVRdWFsaWZpZXI9Imh0dHA6Ly8xMC4wLjE5MC43NzozMDAwIiBGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpuYW1laWQtZm9ybWF0OnRyYW5zaWVudCI+XzEzODNmZWNlYmYzYjhiYWIyYTgwN2ZmNmIxOWNhMzJlOWU0MDIxN2Q2ZDwvc2FtbDpOYW1lSUQ+PHNhbWw6U3ViamVjdENvbmZpcm1hdGlvbiBNZXRob2Q9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpjbTpiZWFyZXIiPjxzYW1sOlN1YmplY3RDb25maXJtYXRpb25EYXRhIE5vdE9uT3JBZnRlcj0iMjAxOS0wMS0xN1QxMDo0MjozN1oiIFJlY2lwaWVudD0iaHR0cDovLzEwLjAuMTkwLjc3OjMwMDAvdmVyaWZ5IiBJblJlc3BvbnNlVG89Il83NDY2Yzc2ZS00MGM0LTQ5OTUtYWY4Yi0wZjJlMTkyYjYzNDQiLz48L3NhbWw6U3ViamVjdENvbmZpcm1hdGlvbj48L3NhbWw6U3ViamVjdD48c2FtbDpDb25kaXRpb25zIE5vdEJlZm9yZT0iMjAxOS0wMS0xN1QxMDozNzowN1oiIE5vdE9uT3JBZnRlcj0iMjAxOS0wMS0xN1QxMDo0MjozN1oiPjxzYW1sOkF1ZGllbmNlUmVzdHJpY3Rpb24+PHNhbWw6QXVkaWVuY2U+aHR0cDovLzEwLjAuMTkwLjc3OjMwMDA8L3NhbWw6QXVkaWVuY2U+PC9zYW1sOkF1ZGllbmNlUmVzdHJpY3Rpb24+PC9zYW1sOkNvbmRpdGlvbnM+PHNhbWw6QXV0aG5TdGF0ZW1lbnQgQXV0aG5JbnN0YW50PSIyMDE5LTAxLTE3VDEwOjE4OjM4WiIgU2Vzc2lvbk5vdE9uT3JBZnRlcj0iMjAxOS0wMS0xN1QxODoxODozOFoiIFNlc3Npb25JbmRleD0iXzU1NjcyNDg5ODI5ZjIzMzcyZDRiZDA0NDBmYjAzOTM0NTUyYmUxZmYwZCI+PHNhbWw6QXV0aG5Db250ZXh0PjxzYW1sOkF1dGhuQ29udGV4dENsYXNzUmVmPnVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphYzpjbGFzc2VzOlBhc3N3b3JkPC9zYW1sOkF1dGhuQ29udGV4dENsYXNzUmVmPjwvc2FtbDpBdXRobkNvbnRleHQ+PC9zYW1sOkF1dGhuU3RhdGVtZW50PjxzYW1sOkF0dHJpYnV0ZVN0YXRlbWVudD48c2FtbDpBdHRyaWJ1dGUgTmFtZT0idWlkIiBOYW1lRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXR0cm5hbWUtZm9ybWF0OmJhc2ljIj48c2FtbDpBdHRyaWJ1dGVWYWx1ZSB4c2k6dHlwZT0ieHM6c3RyaW5nIj4xPC9zYW1sOkF0dHJpYnV0ZVZhbHVlPjwvc2FtbDpBdHRyaWJ1dGU+PHNhbWw6QXR0cmlidXRlIE5hbWU9ImVkdVBlcnNvbkFmZmlsaWF0aW9uIiBOYW1lRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXR0cm5hbWUtZm9ybWF0OmJhc2ljIj48c2FtbDpBdHRyaWJ1dGVWYWx1ZSB4c2k6dHlwZT0ieHM6c3RyaW5nIj5ncm91cDE8L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48c2FtbDpBdHRyaWJ1dGUgTmFtZT0iZW1haWwiIE5hbWVGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphdHRybmFtZS1mb3JtYXQ6YmFzaWMiPjxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhzaTp0eXBlPSJ4czpzdHJpbmciPnVzZXIxQGV4YW1wbGUuY29tPC9zYW1sOkF0dHJpYnV0ZVZhbHVlPjwvc2FtbDpBdHRyaWJ1dGU+PHNhbWw6QXR0cmlidXRlIE5hbWU9InByZWZlcnJlZExhbmd1YWdlIiBOYW1lRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXR0cm5hbWUtZm9ybWF0OmJhc2ljIj48c2FtbDpBdHRyaWJ1dGVWYWx1ZSB4c2k6dHlwZT0ieHM6c3RyaW5nIj5lbjwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT48L3NhbWw6QXR0cmlidXRlPjwvc2FtbDpBdHRyaWJ1dGVTdGF0ZW1lbnQ+PC9zYW1sOkFzc2VydGlvbj48L3NhbWxwOlJlc3BvbnNlPg==';

        // parseSAMLResponse(serviceProvider, identityProvider, response);
      });
    });

  });
});
