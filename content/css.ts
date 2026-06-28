import { getEnabledUserStyleCss } from '../lib/user-styles'
import { noutubeSettingsEvent, noutubeUserStylesEvent } from './noutube'

const injectedStyleId = '_nou_injected_css'

const css = (strings: string[] | ArrayLike<string>, ...values: any[]) => String.raw({ raw: strings }, ...values)

const cssContentMobile = css`
  * {
    user-select: none;
  }

  /*
   * Text zoom (webView textZoom) scales fonts but not the fixed pixel heights
   * YouTube hardcodes on its text containers, so zoomed titles/headlines get
   * clipped. Drop those height clamps so the boxes grow with the text;
   * -webkit-line-clamp still truncates long titles to the intended line count.
   */
  [class*='headline' i],
  [class*='title' i],
  [class*='subhead' i],
  [class*='channel-name' i] {
    height: auto !important;
    max-height: none !important;
  }
`

const cssContent = css`
  ytd-page-top-ad-layout-renderer,
  ytd-in-feed-ad-layout-renderer,
  ad-slot-renderer,
  yt-mealbar-promo-renderer,
  ytm-promoted-sparkles-web-renderer,
  .ytd-player-legacy-desktop-watch-ads-renderer,
  a.app-install-link,
  a.yt-spec-button-shape-next {
    display: none !important;
  }

  #_nou_livechat {
    width: 100%;
    height: 50vh;
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: column;
    border-top: 1px solid #e5e5e5;
    background: white;
    z-index: 10;
  }
  #_nou_livechat.right {
    width: 36vw;
    height: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    border-top: none;
    border-left: 1px solid #e5e5e5;
  }

  #_nou_livechat button {
    position: absolute;
    top: 1.25rem;
    left: 50%;
    transform: translateX(-50%);
  }

  #_nou_livechat div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #_nou_livechat iframe {
    position: relative;
    flex: 1;
    border: none;
  }

  #_nou_livechat_btn {
    padding: 0.75rem 1rem;
    background: #e1002d;
    color: white;
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    border-radius: 18px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 16px;
  }

  .quick-actions-wrapper.enable-rtl-mirroring {
    display: none !important;
  }

  #_nou_audio_btn {
    display: flex;
    align-items: center;
    background: #34d399;
    padding: 0 4px;
    color: #44403c;
    border-radius: 4px;
    margin-left: 8px;
  }
  #_nou_audio_picker {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }
  #_nou_audio_picker select {
    border: none;
    background: #a7f3d0;
    color: #44403c;
    padding: 2px;
  }

  /* ===================================================================
   * WATCH-PAGE VIDEO PLAYER
   * Keep audio playing but hide the video frames behind a solid overlay.
   * =================================================================== */
  #movie_player video,
  #movie_player .ytp-cued-thumbnail-overlay,
  #movie_player .html5-main-video,
  #movie_player .ytp-poster,
  #movie_player .ytp-thumbnail-overlay {
    visibility: hidden !important;
    opacity: 0 !important;
  }

  #movie_player,
  #movie_player .html5-video-container,
  #player-container-id,
  #player-container-outer,
  ytm-player,
  ytm-player-page,
  ytd-player {
    position: relative !important;
    background: #1a1a1a !important;
  }

  #movie_player .html5-video-container::after,
  #movie_player::after {
    content: "גרסה כשרה - האזנה בלבד" !important;
    position: absolute !important;
    inset: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center !important;
    background: #1a1a1a !important;
    color: #ffffff !important;
    font-size: 22px !important;
    font-weight: 700 !important;
    line-height: 1.4 !important;
    z-index: 50 !important;
    pointer-events: none !important;
    direction: rtl !important;
    padding: 16px !important;
    box-sizing: border-box !important;
    width: 100% !important;
    height: 100% !important;
  }

  /* Hide YouTube's in-player visual overlays (cards, end screens, branding) */
  .ytp-cards-button,
  .ytp-cards-teaser,
  .iv-branding,
  .iv-promo,
  .html5-endscreen,
  .ytp-ce-element,
  .ytp-ce-shrinking-element,
  .ytp-pause-overlay,
  .ytp-show-tiles,
  .ytp-endscreen-content,
  .ytp-endscreen-previous,
  .ytp-endscreen-next,
  .iv-video-preview,
  .ytp-preview-overlay,
  .ytp-storyboard-framepreview {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }

  /* ===================================================================
   * THUMBNAILS — all locations (home, search, related, channel, shorts)
   * Mobile: ytm-thumbnail / ytm-thumbnail-no-interaction / ytm-playlist-thumbnail
   * Desktop: ytd-thumbnail / ytd-playlist-thumbnail / ytd-rich-thumbnail
   * =================================================================== */
  ytm-thumbnail,
  ytm-thumbnail-no-interaction,
  ytm-playlist-thumbnail,
  ytm-lockup-view-model,
  ytd-thumbnail,
  ytd-playlist-thumbnail,
  ytd-rich-thumbnail,
  yt-lockup-view-model ytd-thumbnail,
  ytm-reel-item thumbnail,
  ytd-reel-item-renderer ytd-thumbnail,
  ytm-shorts-lockup-view-model,
  ytd-shorts-lockup-view-model {
    position: relative !important;
  }

  ytm-thumbnail::after,
  ytm-thumbnail-no-interaction::after,
  ytm-playlist-thumbnail::after,
  ytm-lockup-view-model::after,
  ytd-thumbnail::after,
  ytd-playlist-thumbnail::after,
  ytd-rich-thumbnail::after,
  ytd-rich-item-renderer ytd-thumbnail::after,
  ytm-reel-item thumbnail::after,
  ytd-reel-item-renderer ytd-thumbnail::after,
  ytm-shorts-lockup-view-model::after,
  ytd-shorts-lockup-view-model::after {
    content: "גרסה כשרה" !important;
    position: absolute !important;
    inset: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: #1a1a1a !important;
    color: #ffffff !important;
    font-size: 13px !important;
    font-weight: 700 !important;
    z-index: 6 !important;
    direction: rtl !important;
    text-align: center !important;
    pointer-events: none !important;
    padding: 4px !important;
    box-sizing: border-box !important;
    border-radius: inherit !important;
  }

  /* Hide the underlying thumbnail images */
  ytm-thumbnail img,
  ytm-thumbnail-no-interaction img,
  ytm-playlist-thumbnail img,
  ytm-lockup-view-model img,
  ytd-thumbnail img,
  ytd-playlist-thumbnail img,
  ytd-rich-thumbnail img,
  ytd-rich-item-renderer ytd-thumbnail img,
  ytm-reel-item thumbnail img,
  ytd-reel-item-renderer ytd-thumbnail img,
  ytm-shorts-lockup-view-model img,
  ytd-shorts-lockup-view-model img,
  ytm-thumbnail .yt-core-image,
  ytd-thumbnail .yt-core-image,
  ytm-thumbnail .yt-preview-image,
  ytd-thumbnail .yt-preview-image,
  .yt-core-image--filled-parent-width {
    visibility: hidden !important;
    opacity: 0 !important;
  }

  /* Also cover the rich-item hover preview */
  ytd-rich-item-renderer yt-img-shadow img,
  ytm-rich-item-renderer yt-img-shadow img {
    visibility: hidden !important;
    opacity: 0 !important;
  }

  /* ===================================================================
   * CHANNEL AVATARS / PROFILE PICTURES
   * Cover every avatar with a solid color on every page (home, search,
   * watch sidebar, channel pages, comments, etc.).
   * =================================================================== */
  yt-img-shadow,
  yt-img-shadow.yt-spec-avatar-shape,
  .yt-spec-avatar-shape,
  .yt-spec-avatar-shape__image,
  .yt-spec-avatar-shape__avatar,
  ytm-channel-profile-picture-renderer,
  ytm-profile-icon,
  ytd-channel-avatar,
  ytd-avatar-renderer,
  ytd-guide-entry-renderer #avatar,
  #avatar.ytd-c4-tabbed-header-renderer,
  #avatar.ytd-channel-renderer,
  #author-thumbnail.ytd-comment-renderer,
  #author-thumbnail.ytd-commentbox,
  ytm-comment-comment-thumbnail-renderer,
  ytm-comment-section-header-renderer yt-img-shadow,
  .ytd-channel-name yt-img-shadow,
  .ytd-video-renderer yt-img-shadow,
  .ytcp-avatar,
  .avatar,
  .channel-avatar,
  .comment-author-avatar,
  .yt-commentbox-tpc-avatar {
    background: #1a1a1a !important;
    border-radius: 50% !important;
  }

  yt-img-shadow img,
  yt-img-shadow .yt-core-image,
  .yt-spec-avatar-shape__image,
  .yt-spec-avatar-shape__image img,
  .yt-spec-avatar-shape img,
  ytm-channel-profile-picture-renderer img,
  ytm-profile-icon img,
  ytd-channel-avatar img,
  ytd-avatar-renderer img,
  ytd-guide-entry-renderer #avatar img,
  #avatar.ytd-c4-tabbed-header-renderer img,
  #avatar.ytd-channel-renderer img,
  #author-thumbnail.ytd-comment-renderer img,
  #author-thumbnail.ytd-commentbox img,
  ytm-comment-comment-thumbnail-renderer img,
  .ytd-channel-name yt-img-shadow img,
  .ytd-video-renderer yt-img-shadow img,
  .ytcp-avatar img,
  .avatar img,
  .channel-avatar img,
  .comment-author-avatar img,
  .yt-commentbox-tpc-avatar img {
    visibility: hidden !important;
    opacity: 0 !important;
  }

  /* Channel banner image - hide entirely */
  #c4-tabbed-header-bg-image,
  yt-image.ytd-c4-tabbed-header-renderer,
  .ytd-banner-renderer,
  #background.ytd-c4-tabbed-header-renderer,
  #banner-template ytd-image,
  .ytd-c4-tabbed-header-renderer #background {
    visibility: hidden !important;
    opacity: 0 !important;
    background: #1a1a1a !important;
  }

  /* Channel "feature banner" hero image on mobile */
  ytm-browse-response #header img,
  ytm-channel-header-renderer img,
  .ytm-channel-header-renderer img {
    visibility: hidden !important;
    opacity: 0 !important;
    background: #1a1a1a !important;
  }

  /* ===================================================================
   * YOUTUBE MUSIC — album art / song thumbnails
   * =================================================================== */
  ytm-player-page .image,
  ytm-player-page yt-img-shadow img,
  ytm-player-page .yt-spec-avatar-shape img,
  .ytm-autonav-toggle,
  ytm-player-page .background {
    visibility: hidden !important;
    opacity: 0 !important;
  }

  ytm-player-page .image,
  ytm-player-page yt-img-shadow,
  ytm-player-page .yt-spec-avatar-shape {
    background: #1a1a1a !important;
  }

  /* ===================================================================
   * STANDALONE PREVIEW IMAGES / STORYBOARD FRAMES
   * =================================================================== */
  .ytp-storyboard,
  .ytp-storyboard-framepreview,
  .ytp-cued-thumbnail-overlay-image,
  .ytp-spinner-layer,
  .ytp-scrubber-button {
    visibility: hidden !important;
    opacity: 0 !important;
  }

  /* Embed preview thumbnails (e.g. shared links) */
  .yt-lockup-view-model yt-img-shadow img,
  .ytd-compact-video-renderer yt-img-shadow img,
  .ytd-grid-video-renderer yt-img-shadow img,
  .ytm-compact-video-renderer yt-img-shadow img,
  .ytm-media-item yt-img-shadow img,
  .ytm-video-renderer yt-img-shadow img,
  .ytm-video-card-renderer yt-img-shadow img {
    visibility: hidden !important;
    opacity: 0 !important;
  }
`

export const getCoreCss = () => cssContent + (window.NouTubeI ? cssContentMobile : '')

export const getInjectedCss = (userStyles?: any) => {
  return [getCoreCss(), getEnabledUserStyleCss(document.location.host, userStyles)].filter(Boolean).join('\n\n')
}

export function injectCSS() {
  const style = document.querySelector<HTMLStyleElement>(`#${injectedStyleId}`) || document.createElement('style')

  const update = () => {
    const userStyles = window.NouTube?.getUserStyles?.()
    style.textContent = getInjectedCss(userStyles)
  }

  style.id = injectedStyleId
  style.type = 'text/css'
  update()
  ;(document.head || document.documentElement).appendChild(style)
  window.addEventListener(noutubeSettingsEvent, update)
  window.addEventListener(noutubeUserStylesEvent, update)
}

export function hideShorts() {
  const style = document.createElement('style')
  style.id = 'noutube-shorts'
  style.type = 'text/css'
  style.textContent = `
ytm-reel-shelf-renderer,
ytd-rich-section-renderer,
.ytGridShelfViewModelHost {
  display: none !important;
}
`
  document.head.appendChild(style)
}

export function showShorts() {
  document.querySelector('style#noutube-shorts')?.remove()
}
