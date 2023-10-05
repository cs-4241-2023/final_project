import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.center}>
      <title>What's The Deal Login Page</title>
      <h1>WhAt'S tHe DeAl Login Page</h1>
      <Link href="/components">Header</Link>
    </div>
  )
}
