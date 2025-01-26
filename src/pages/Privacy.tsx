const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <h2>プライバシーポリシー</h2>
      <div className="privacy-content">
        <section>
          <h3>1. データ収集について</h3>
          <ul>
            <li>
              当サービスでは、Cloudflare Web
              Analyticsを利用してWebページのパフォーマンスや利用状況に関する統計情報を収集します
            </li>
            <li>
              Cloudflare Web
              Analyticsは、Cookieやローカルストレージを使用せず、個人を特定する情報（IPアドレスやユーザーエージェントなど）を収集しません
            </li>
            <li>
              <a
                href="https://www.cloudflare.com/ja-jp/privacypolicy/"
                target="_blank"
                rel="noopener"
              >
                Cloudflare Web Analyticsのプライバシーポリシー
              </a>
            </li>
          </ul>
        </section>
        <section>
          <h3>2. ユーザーデータの取り扱い</h3>
          <ul>
            <li>
              当サービスにはユーザーアカウントは存在しないため、ユーザーの個人情報（氏名、住所、メールアドレス等）、その他関連情報は保持しません
            </li>
          </ul>
        </section>
        <section>
          <h3>3. サードパーティとの共有</h3>
          <ul>
            <li>
              当サービスは、Cloudflare Web
              Analytics以外のサードパーティとデータを共有することはありません
            </li>
          </ul>
        </section>
        <section>
          <h3>4. プライバシーポリシーの変更</h3>
          <ul>
            <li>
              本ポリシーは必要に応じて改定される場合があります
            </li>
            <li>
              本ポリシーに変更があった場合は、本ウェブサイト上で通知いたします
            </li>
          </ul>
        </section>
        <section>
          <h3>改訂履歴</h3>
          <ul>
            <li>2025年1月19日 - 新規制定</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default PrivacyPolicy
