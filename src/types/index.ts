export interface Address {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
}

export interface Company {
  id?: number;
  name?: string;
  abn?: string;
  acn?: string;
  industry?: string;
  industryCode?: string;
  employeeCount?: number;
  revenueBand?: string;
  website?: string;
  emailDomain?: string;
  phone?: string;
  address?: Address;
}

export type SortByOption =
  | "name-asc"
  | "name-desc"
  | "revenue-asc"
  | "revenue-desc"
  | "employees-asc"
  | "employees-desc";

export interface FilterState {
  activeOnly: boolean;
  gstRegistered: boolean;
  industries: string[];
  employeeSizes: string[];
  states: string[];
  revenueBands: string[];
}

export interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  setFilters: (name: keyof FilterState, value: any) => void;
}

export interface Location {
  id: number;
  state: string;
  postcode: string;
}

export interface EntityType {
  code: string;
  description?: string;
}

export interface BusinessName {
  id: number;
  abn: string;
  name?: string;
  type?: string;
}

export interface DgrFund {
  id: number;
  abn: string;
  fund_name: string;
  "status_from_...": string;
}

export interface Entity {
  abn: string;
  abn_status: string;
  abn_status_from_date: string;
  entity_type_code: string;
  legal_name: string;
  gst_status: string;
  gst_status_from_date: string;
  state: string;
  postcode: string;
  last_updated: string;
  location_id: number;
  business_names: BusinessName[];
  dgr_funds: DgrFund[];
  entity_types: EntityType;
  locations: Location;
}

export interface CompanyEntity {
  abn?: string;
  abn_status?: string;
  abn_status_from_date?: string;
  acn?: string;
  address?: Address;
  business_names?: BusinessName[];
  dgr_funds?: DgrFund[];
  emailDomain?: string;
  employeeCount?: number;
  entity_type_code?: string;
  entity_types?: EntityType;
  gst_status?: string;
  gst_status_from_date?: string;
  id?: number;
  industry?: string;
  industryCode?: string;
  last_updated?: string;
  legal_name?: string;
  location_id?: number;
  locations?: Location;
  name?: string;
  phone?: string;
  postcode?: string;
  revenueBand?: string;
  state?: string;
  website?: string;
}
