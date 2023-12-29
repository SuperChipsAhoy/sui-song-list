import styles from "../styles/Home.module.css";

import { Button } from "react-bootstrap";

export default function SongDetail({
  filteredSongList,
  handleClickToCopy,
  showBiliPlayer
}) {
  if (filteredSongList.length == 0) {
    return (
      <tr>
        <td className="display-6 text-center" colSpan="6" id="noSongInList">
          歌单里没有诶~隐藏歌单碰碰运气!
        </td>
      </tr>
    );
  }
  return filteredSongList.map((song) => (
    <tr
      className={
        song.paid
          ? styles.songRowPaid
          : song.sticky_top
          ? styles.songRowTop
          : styles.songRow
      }
      key={song.index}
      onClick={(e) => {
        handleClickToCopy(song);
      }}
    >
      <td className={styles.tableIconTd}>
        {song.sticky_top == 1 ? (
          <img
            src="/assets/icon/up_arrow.png"
            alt="置顶"
            className={styles.tableIcons}
            title="置顶曲目"
          ></img>
        ) : (
          <div></div>
        )}
        {song.paid == 1 ? (
          <img
            src="/assets/icon/orb.png"
            alt="付费"
            className={styles.tableIcons}
            title="付费曲目"
          ></img>
        ) : (
          <div></div>
        )}
      </td>
      <td
        className={styles.noWrapForce}
        id={song.paid ? `paid ${song.index}` : song.index}
      >
        {song.song_name}
      </td>
      <td className={styles.tableIconTd}>
        {song.BVID || song.url ? (
          <Button
            className={styles.customRandomButton}
            title="投稿歌切试听"
            style={{ marginTop: 0, padding: "0.25rem" }}
            onClick={(e) => {
              e.stopPropagation();
              showBiliPlayer(song)
            }}
          >
            <div className="d-flex">
            {
              song.url ? (
                <svg t="1703751553212" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5366" width="32" height="32">
                  <path d="M849.92 51.2H174.08c-67.8656 0-122.88 55.0144-122.88 122.88v675.84c0 67.8656 55.0144 122.88 122.88 122.88h675.84c67.8656 0 122.88-55.0144 122.88-122.88V174.08c0-67.8656-55.0144-122.88-122.88-122.88z m-80.38912 605.91104c-32.82432 77.88032-90.5728 128.10752-171.7504 151.20384a284.83584 284.83584 0 0 1-94.592 10.39872c-66.60096-3.7888-124.29824-28.9536-172.90752-74.4448-47.95392-44.88192-77.85472-100.06016-88.25856-164.83328-14.15168-88.10496 7.55712-167.10656 64.96256-235.61216 31.5392-37.632 70.8864-64.75264 116.77696-82.26304 15.81568-6.03648 33.1264-0.41984 41.8048 13.39392 8.86272 14.10048 6.78912 32.25088-5.49888 43.48416-3.47136 3.1744-7.85408 5.67808-12.2368 7.46496-69.95968 28.56448-116.18304 78.86848-134.53824 152.22784-17.81248 71.17824-2.06336 136.33024 43.41248 193.73056 28.50304 35.98336 65.32608 60.14976 109.89568 72.01792 28.80512 7.66976 57.91744 8.17152 87.25504 3.6352 30.27456-4.67968 58.5472-14.63296 83.90656-31.99488 34.8928-23.88992 59.74528-55.75168 72.17664-96.26624 10.74176-34.9952 11.10528-70.31296-2.16064-105.04192-10.6752-27.94496-29.5424-49.45408-53.20704-67.18464-12.6464-9.472-26.21952-16.87552-41.69728-20.50048-0.70144-0.16384-1.41824-0.24576-2.69824-0.45056 2.11456 8.09984 4.08064 15.79008 6.10816 23.45984 4.91008 18.5088 9.92256 36.98688 14.75072 55.51616 10.48576 40.2688 0.34304 75.55584-27.392 105.62048-25.6512 27.81184-58.31168 39.9104-95.77472 36.28544-41.70752-4.0448-71.4752-26.6752-90.90048-63.32416-10.17344-19.18976-14.56128-39.87456-15.37024-61.5168-1.29024-34.4576 6.75328-66.27328 26.49088-94.70976 21.20192-30.54592 50.57024-50.14016 85.26336-62.32576 2.73408-0.95744 5.49376-1.82784 8.69888-2.8928-1.86368-7.08608-3.81952-14.0032-5.49376-20.992-2.31424-9.60512-5.28384-19.15904-6.44608-28.91776-3.44064-28.8512 5.42208-53.95968 25.35936-74.96704 16.32256-17.2032 36.12672-28.11904 59.84256-31.37536 2.61632-0.3584 5.2224-0.75776 7.82336-1.13664h10.68032c6.20544 1.00864 12.48256 1.72544 18.62144 3.07712 21.57056 4.75136 40.88832 14.30016 57.9328 28.29824 11.1872 9.18016 15.75424 21.15584 12.51328 35.34336-2.90304 12.75392-11.06432 21.34016-23.64928 25.0112-11.89376 3.47136-22.656 0.83968-32.43008-6.99392-12.38016-9.92256-26.12224-16.7936-42.59328-15.32416-13.95712 1.24416-27.31008 15.92832-26.112 29.04064 0.5376 5.86752 2.6368 11.5968 4.12672 17.36192 2.6368 10.19392 5.34016 20.36736 8.01792 30.5408 0.46592 1.75616 0.896 3.15904 3.34848 3.29216 37.51936 2.048 71.32672 14.25408 101.44768 36.8896 29.6192 22.26176 53.87264 48.96768 70.12864 82.52928 11.92448 24.63232 18.6112 50.64192 20.3776 77.94688 2.36544 36.28544-1.8944 71.7824-16.01536 105.29792z" fill="#D81E06" p-id="5367"></path><path d="M548.52096 462.01344l-8.77568-33.19808c-20.54656 6.528-38.29248 16.49664-51.58912 33.08544-17.80224 22.21568-21.35552 47.73376-15.67232 74.8544 2.94912 14.08 9.83552 26.13248 21.92384 34.54464 15.11424 10.5216 35.69664 10.06592 51.50208-0.87552 16.1536-11.1872 23.3472-29.22496 18.62656-47.72864-5.1712-20.26496-10.66496-40.45312-16.01536-60.68224z" fill="#D81E06" p-id="5368"></path>
                </svg>
              ) : (
                <svg t="1703751510016" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4244" width="32" height="32">
                  <path d="M450.803484 456.506027l-120.670435 23.103715 10.333298 45.288107 119.454151-23.102578-9.117014-45.289244z m65.04448 120.060586c-29.483236 63.220622-55.926329 15.502222-55.926328 15.502223l-19.754098 12.768142s38.90176 53.192249 75.986489 12.764729c43.770311 40.42752 77.203911-13.068516 77.203911-13.068516l-17.934791-11.55072c0.001138-0.304924-31.305956 44.983182-59.575183-16.415858z m59.57632-74.773617L695.182222 524.895573l10.029511-45.288106-120.364373-23.103716-9.423076 45.289245z m237.784178-88.926436c-1.905778-84.362809-75.487004-100.540871-75.487004-100.540871s-57.408853-0.316302-131.944676-0.95232l54.237867-52.332089s8.562916-10.784996-6.026809-22.834062c-14.592-12.051342-15.543182-6.660551-20.615396-3.487289-4.441884 3.169849-69.462471 66.920676-80.878933 78.340551-29.494613 0-60.2624-0.319716-90.075591-0.319716h10.466418s-77.705671-76.754489-82.781298-80.241777c-5.075627-3.488427-5.709369-8.56064-20.616533 3.487289-14.589724 12.05248-6.026809 22.8352-6.026809 22.8352l55.504213 53.919288c-60.261262 0-112.280462 0.319716-136.383147 1.268623-78.025387 22.521173-71.99744 100.859449-71.99744 100.859449s0.950044 168.100978 0 253.103217c8.562916 85.00224 73.899804 98.636231 73.899805 98.636231s26.007324 0.63488 45.357511 0.63488c1.900089 5.391929 3.486151 32.034133 33.302756 32.034134 29.495751 0 33.30048-32.034133 33.30048-32.034134s217.263218-0.950044 235.340231-0.950044c0.953458 9.196658 5.394204 33.619058 35.207395 33.303893 29.494613-0.636018 31.714418-35.20512 31.714418-35.20512s10.151253-0.95232 40.280747 0c70.413653-13.005938 74.534684-95.468658 74.534684-95.468657s-1.265209-169.689316-0.312889-254.056676zM752.628622 681.8304c0 13.319964-10.467556 24.102684-23.471218 24.102684H300.980907c-13.003662 0-23.47008-10.78272-23.47008-24.102684V397.961671c0-13.32224 10.467556-24.106098 23.47008-24.106098h428.176497c13.003662 0 23.471218 10.783858 23.471218 24.106098v283.868729z" fill="#1296db" p-id="4245"></path>
                </svg>
              )
            }
            </div>
          </Button>
        ) : (
          <div></div>
        )}
      </td>
      <td className={styles.noWrapForce}>{song.artist}</td>
      <td className={styles.noWrapForce}>{song.language}</td>
      <td className={styles.noWrapForce}>{song.remarks}</td>
    </tr>
  ));
}
