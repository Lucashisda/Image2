'use client';

import Link from 'next/link';
import { useRef, useState, type FormEvent } from 'react';
import { Button, Input, Template } from '@/components';
import { useImageService } from '@/resource/service';

export default function UploadPage() {
  const imageService = useImageService();
  const formRef = useRef<HTMLFormElement | null>(null);

  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [tagsText, setTagsText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess(false);

    const imageName = name.trim();
    const tags = tagsText
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!imageName) {
      setError('Informe o nome da imagem.');
      return;
    }

    if (!file) {
      setError('Selecione um arquivo de imagem.');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError('O arquivo deve ter no máximo 20 MB.');
      return;
    }

    if (tags.length === 0) {
      setError('Informe pelo menos uma tag.');
      return;
    }

    setIsLoading(true);

    try {
      await imageService.enviar(file, imageName, tags);
      setSuccess(true);
      setName('');
      setFile(null);
      setTagsText('');
      formRef.current?.reset();
    } catch (cause) {
      console.error('Erro ao enviar imagem:', cause);
      setError(
        cause instanceof Error
          ? cause.message
          : 'Não foi possível enviar a imagem.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Template>
      <section className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900/90 p-7 shadow-2xl shadow-slate-950/60">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">Upload</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Enviar imagem</h1>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 p-3 text-xl font-bold text-white shadow-lg shadow-cyan-500/20">
            +
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Nome da imagem"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ex: Praia"
            required
          />

          <Input
            label="Arquivo"
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/gif"
            onChange={(event) => setFile(event.currentTarget.files?.[0] ?? null)}
            required
          />

          <Input
            label="Tags"
            type="text"
            value={tagsText}
            onChange={(event) => setTagsText(event.target.value)}
            placeholder="natureza, viagem"
            required
          />

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Enviar imagem'}
            </Button>

            <Link
              href="/galeria"
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              Voltar para a galeria
            </Link>
          </div>
        </form>

        {error && (
          <div role="alert" className="mt-4 rounded-xl border border-red-500/30 bg-red-950/50 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div role="status" className="mt-4 rounded-xl border border-green-500/30 bg-green-950/50 p-3 text-sm text-green-300">
            Imagem enviada com sucesso!
          </div>
        )}
      </section>
    </Template>
  );
}
