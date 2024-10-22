import Image from 'next/image';
import styles from './RecentArticle.module.css';

export default function RecentArticle({ articles }) {
  return (
    <ul className={styles.ul}>
      {articles.map((article) => {
        const formattedDate = new Date(article.createdAt).toLocaleDateString(
          'ko-KR',
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }
        );

        return (
          <li key={article.id} className={styles.recentArticle}>
            <div className={styles.badgeImg}>
              <Image fill src="/images/img_badge.svg" alt="뱃지 이미지" />
            </div>
            <div className={styles.title}>
              <h3>{article.title}</h3>
              <div className={styles.sample}>
                <Image fill src="/images/sample_img.svg" alt="샘플 이미지" />
              </div>
            </div>
            <div className={styles.user}>
              <h3>총명한 판다</h3>
              <div className={styles.heart}>
                <Image fill src="/images/ic_heart.svg" alt="좋아요 이미지" />
              </div>
              <h3>9999+</h3>
              <h3>{formattedDate}</h3>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
