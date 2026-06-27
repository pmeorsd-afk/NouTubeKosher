// Kosher mode for NouTube.
// Hides all visual content on YouTube (and YouTube Music) while leaving audio
// playback intact. Covers the watch-page video element with an "audio only"
// overlay, blurs/covers every thumbnail with a "Kosher version" label, and
// hides all channel profile pictures / avatars with a solid color.

const KOSHER_THUMB_LABEL = 'גרסה כשרה'
const KOSHER_AUDIO_LABEL = 'גרסה כשרה - האזנה בלבד'
const KOSHER_BG = '#1a1a1a'
const KOSHER_FG = '#ffffff'

const css = (strings: string[] | ArrayLike<string>, ...values: any[]) =>
  String.raw({ raw: strings }, ...values)

const kosherCss = css`
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
    background: ${KOSHER_BG} !important;
  }

  #movie_player .html5-video-container::after,
  #movie_player::after {
    content: "${KOSHER_AUDIO_LABEL}" !important;
    position: absolute !important;
    inset: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center !important;
    background: ${KOSHER_BG} !important;
    color: ${KOSHER_FG} !important;
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
    content: "${KOSHER_THUMB_LABEL}" !important;
    position: absolute !important;
    inset: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: ${KOSHER_BG} !important;
    color: ${KOSHER_FG} !important;
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
    background: ${KOSHER_BG} !important;
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
    background: ${KOSHER_BG} !important;
  }

  /* Channel "feature banner" hero image on mobile */
  ytm-browse-response #header img,
  ytm-channel-header-renderer img,
  .ytm-channel-header-renderer img {
    visibility: hidden !important;
    opacity: 0 !important;
    background: ${KOSHER_BG} !important;
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
    background: ${KOSHER_BG} !important;
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

const kosherStyleId = '_nou_kosher_css'

export function installKosherMode() {
  if (document.getElementById(kosherStyleId)) {
    return
  }
  const style = document.createElement('style')
  style.id = kosherStyleId
  style.type = 'text/css'
  style.textContent = kosherCss

  const attach = () => {
    const head = document.head || document.documentElement
    if (head) {
      head.appendChild(style)
    } else {
      // Defer until <head> exists
      requestAnimationFrame(attach)
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach)
  } else {
    attach()
  }

  // Re-inject if YouTube ever strips it (SPA navigation can drop nodes).
  const observer = new MutationObserver(() => {
    if (!document.getElementById(kosherStyleId)) {
      attach()
    }
  })
  observer.observe(document.documentElement, { childList: true, subtree: false })
}
