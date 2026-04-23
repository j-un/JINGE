import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { Modal } from '../Modal'

describe('Modal', () => {
  test('isOpen=false のとき何も描画されない', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={() => {}} title="T">
        <p>body</p>
      </Modal>
    )
    expect(container.firstChild).toBeNull()
    expect(screen.queryByText('body')).not.toBeInTheDocument()
  })

  test('isOpen=true で title と children が表示される', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="タイトル">
        <p>本文</p>
      </Modal>
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('タイトル')).toBeInTheDocument()
    expect(screen.getByText('本文')).toBeInTheDocument()
  })

  test('閉じるボタン (×) 押下で onClose が呼ばれる', () => {
    const onClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={onClose} title="T">
        <p>body</p>
      </Modal>
    )
    fireEvent.click(screen.getByLabelText('閉じる'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('オーバーレイクリックで onClose が呼ばれる', () => {
    const onClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={onClose} title="T">
        <p>body</p>
      </Modal>
    )
    fireEvent.click(screen.getByRole('dialog'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('パネル内部のクリックでは onClose は呼ばれない (伝播停止)', () => {
    const onClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={onClose} title="T">
        <p>本文</p>
      </Modal>
    )
    fireEvent.click(screen.getByText('本文'))
    expect(onClose).not.toHaveBeenCalled()
  })

  test('Escape キーで onClose が呼ばれる', () => {
    const onClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={onClose} title="T">
        <p>body</p>
      </Modal>
    )
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('Escape 以外のキーでは onClose は呼ばれない', () => {
    const onClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={onClose} title="T">
        <p>body</p>
      </Modal>
    )
    fireEvent.keyDown(window, { key: 'Enter' })
    expect(onClose).not.toHaveBeenCalled()
  })
})
