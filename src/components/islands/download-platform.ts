import { type DownloadOptionKey, type PlatformFamily } from '~/data/downloads'

interface NavigatorUserAgentData {
  platform?: string
  getHighEntropyValues?: (hints: string[]) => Promise<{
    architecture?: string
  }>
}

interface NavigatorWithUserAgentData extends Navigator {
  userAgentData?: NavigatorUserAgentData
}

export interface PlatformDetectionInput {
  userAgent: string
  userAgentDataPlatform?: string
  architecture?: string
}

export function detectRecommendedPlatform(input: PlatformDetectionInput): DownloadOptionKey | undefined {
  const platform = detectPlatform(input.userAgentDataPlatform || input.userAgent)

  if (platform === 'macos') {
    if (isX86(input.architecture)) {
      return 'macos-intel'
    }
    if (isArm(input.architecture)) {
      return 'macos-arm'
    }
    return undefined
  }

  if (platform === 'linux') {
    return 'linux-appimage'
  }

  return platform === 'windows' ? 'windows' : undefined
}

export async function detectClientRecommendedPlatform(): Promise<DownloadOptionKey | undefined> {
  const userAgentData = (navigator as NavigatorWithUserAgentData).userAgentData
  let architecture: string | undefined

  if (userAgentData?.getHighEntropyValues) {
    try {
      const highEntropyValues = await userAgentData.getHighEntropyValues(['architecture'])
      architecture = highEntropyValues.architecture
    } catch {
      architecture = undefined
    }
  }

  return detectRecommendedPlatform({
    userAgent: navigator.userAgent,
    userAgentDataPlatform: userAgentData?.platform,
    architecture,
  })
}

function detectPlatform(userAgent: string): PlatformFamily | undefined {
  if (/android|iphone|ipad|ipod/i.test(userAgent)) {
    return undefined
  }
  if (/windows/i.test(userAgent)) {
    return 'windows'
  }
  if (/macintosh|mac os x/i.test(userAgent)) {
    return 'macos'
  }
  return /linux/i.test(userAgent) ? 'linux' : undefined
}

function isX86(architecture: string | undefined) {
  return /x86|x64|amd64/i.test(architecture ?? '')
}

function isArm(architecture: string | undefined) {
  return /arm|aarch64/i.test(architecture ?? '')
}
