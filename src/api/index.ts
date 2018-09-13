export interface IKommune {
  description: string;
  label: string;
  status: string;
}

interface IKommuneResponse {
  containeditems: IKommune[];
}
/**
 * API to fetch kommune from server
 *
 * @returns Promise<IKommune[]>
 */
export const getKommunes = async () => {
  const response = await fetch(
    "https://register.geonorge.no/api/subregister/sosi-kodelister/kartverket/kommunenummer-alle.json"
  );
  const result: IKommuneResponse = await response.json();
  return result.containeditems;
};
