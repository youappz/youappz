export function isPublicSuffix(domainName: string) {
  return domainName.endsWith('.appz.app') || domainName.endsWith('.now.sh');
}
