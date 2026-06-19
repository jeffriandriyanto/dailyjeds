export const useAnalytics = () => {
  const trackCta = (eventName: string, label: string) => {
    if (process.client && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        event_category: 'Engagement',
        event_label: label,
        value: 1,
      })
    }
  }

  const trackClick = (label: string) => trackCta('click', label)
  const trackWaClick = (label: string) => trackCta('whatsapp_click', label)
  const trackSocialClick = (platform: string) => trackCta('social_click', platform)
  const trackScroll = (section: string) => trackCta('scroll_to_section', section)

  return {
    trackCta,
    trackClick,
    trackWaClick,
    trackSocialClick,
    trackScroll,
  }
}
