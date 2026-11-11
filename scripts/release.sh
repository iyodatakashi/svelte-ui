#!/usr/bin/env bash
# npm に公開し、公開したコミットにタグを付け、main を develop に早送りして push する
set -euo pipefail

version=$(node -p "require('./package.json').version")

if [ "$(git branch --show-current)" != "develop" ]; then
	echo "develop ブランチで実行してください" >&2
	exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
	echo "未コミットの変更があります" >&2
	exit 1
fi

if [ "$(git log -1 --format=%s)" != "ver$version" ]; then
	echo "HEAD が ver$version のコミットではありません" >&2
	exit 1
fi

overdue=$({ grep -rnoE "Remove in [0-9]+\.[0-9]+\.[0-9]+" src/lib || true; } | while IFS= read -r line; do
	target=${line##* }
	if [ "$(printf '%s\n%s\n' "$target" "$version" | sort -V | head -1)" = "$target" ]; then
		echo "$line"
	fi
done)
if [ -n "$overdue" ]; then
	echo "削除予定のバージョンに達した非推奨の API があります" >&2
	echo "$overdue" >&2
	exit 1
fi

if ! git merge-base --is-ancestor main develop; then
	echo "main を develop に早送りできません" >&2
	exit 1
fi

npm publish

git tag -a "$version" -m "$version"
git fetch . develop:main
git push origin develop main "$version"
