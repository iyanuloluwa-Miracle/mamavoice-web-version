// ── Envelope ─────────────────────────────────────────────────────────────────

// The backend wraps every response body in this envelope; callers must unwrap `.data`.
export interface ApiEnvelope<T> {
  success: boolean
  statusCode: number
  message: string
  data: T
}

// ── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthUserDto {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  language: 'English' | 'Yoruba' | 'Igbo' | 'Hausa' | null
  state: string | null
  lga: string | null
  motherStage: 'Pregnant' | 'New Mom' | null
  targetDate: string | null
  accountStatus: 'active' | 'suspended' | 'deactivated'
  emailVerified: boolean
  profileCompleted: boolean
}

export interface VerifyEmailResponse {
  token: string
  refreshToken: string
  isExistingUser: boolean
  user: AuthUserDto
}

export interface LoginResponse {
  token: string
  refreshToken: string
  isExistingUser: boolean
  user: AuthUserDto
}

export interface RegisterResponse {
  email: string
  otpId: string
}

export interface RefreshResponse {
  token: string
  refreshToken: string
}

// ── User ─────────────────────────────────────────────────────────────────────

export type UserProfileDto = AuthUserDto

export interface UpdateProfileRequest {
  firstName: string
  lastName: string
  language: 'English' | 'Yoruba' | 'Igbo' | 'Hausa'
  state: string
  lga: string
  motherStage: 'Pregnant' | 'New Mom'
  targetDate: string
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

export interface DashboardDto {
  firstName: string
  statusText: string
  currentWeek: number
  daysToNextVaccine: number | null
  nextVaccineName: string | null
}

// ── AI ───────────────────────────────────────────────────────────────────────

export interface AiQueryResponse {
  aiResponseText: string
  isDangerSign: boolean
}

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY'

export interface VoiceTextQueryResponse {
  spokenResponse: string
  spokenResponseEnglish: string
  riskLevel: RiskLevel
  aiResponseText: string
  isDangerSign: boolean
  language: string
  audioUrl: string | null
  audioContentType: string | null
}

export interface VoiceQueryResponse extends VoiceTextQueryResponse {
  profileLanguage: string
  detectedLanguage: string | null
  transcript: string
  sttConfidence: number
}

// ── Vaccines ─────────────────────────────────────────────────────────────────

export interface VaccineItemDto {
  vaccineId: string
  vaccineName: string
  dueDateString: string
  dueDate: string | null
  isCompleted: boolean
  administeredDate: string | null
  sideEffects: string | null
}

export interface LogVaccineRequest {
  vaccineId: string
  administeredDate: string
  vaccineName?: string
  isCompleted?: boolean
  sideEffects?: string
}

export interface LogVaccineResponse {
  id: string
  vaccineId: string
  vaccineName: string
  isCompleted: boolean
  administeredDate: string | null
  sideEffects: string | null
  updatedAt: string
}

// ── Health Tracker ────────────────────────────────────────────────────────────

export interface HealthLogItemDto {
  id: string
  logDate: string
  weightKg: number | null
  bloodPressure: string | null
  nutritionNotes: string | null
  symptoms: string | null
  createdAt: string
  updatedAt: string
}

export interface LogHealthRequest {
  logDate: string
  weightKg?: number
  bloodPressure?: string
  nutritionNotes?: string
  symptoms?: string
}

// ── Foods ─────────────────────────────────────────────────────────────────────

export interface NutritionalValuesDto {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sodium: number
  iron: number
  calcium: number
  vitaminC: number
  folate: number
  vitaminA: number
  zinc: number
  [key: string]: number | undefined
}

export interface FoodItemDto {
  id: string
  name: string
  category: string
  benefits: string
  mamaVoiceTip: string
  dangerWarning: string | null
  preparationTips: string | null
  affordabilityRating: number
  availabilityRating: number
  imageUrls: string[] | null
  nutritionalValues: NutritionalValuesDto
  suitableFor: string[]
  trimesterRecommendation: string[]
  keyNutrients: string[]
  servingSuggestion: string | null
  pairsWellWith: string[]
  avoidWith: string[] | null
  isHighIron: boolean
  isHighFolate: boolean
  isHighCalcium: boolean
  isHighProtein: boolean
  isHighVitaminC: boolean
}

// ── Enums ─────────────────────────────────────────────────────────────────────

export interface EnumsDto {
  profileTypes: string[]
  languages: string[]
  motherStages: string[]
  foodCategories: string[]
  foodStages: string[]
  trimesters: string[]
  devicePlatforms: string[]
  states: string[]
  stateLgas: Record<string, string[]>
}
