export class MessageUtility {
  public static getKeyAndCountryCode(receivedMessage: string) {
    const arr: string[] = receivedMessage.split(' ');
    if (arr.length === 2) {
      return { key: arr[0], countryCode: arr[1] };
    } else {
      return { key: null, countryCode: null };
    }
  }

  public static invalidQueryMessage() {
    return `
    \nPlease ask for any of these stats: 
    \n1. CASES TOTAL 
    \n2. DEATHS TOTAL 
    \n3. CASES <country-code> 
    \n4. DEATHS <country-code>
`;
  }

  public static totalActiveCasesMessage(count: number): string {
    return `Total Active Cases ${count}`
  }

  public static totalDeathsMessage(count: number): string {
    return `Total Deaths ${count}`;
  }

  public static totalActiveCasesByCountryMessage(countryCode: string, count: number): string {
    return `${countryCode.toUpperCase()} Active Cases ${count}`;
  }

  public static totalDeathsByCountry(countryCode: string, count: number): string {
    return `${countryCode.toUpperCase()} Deaths ${count}`;
  }

}